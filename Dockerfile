# 1. 先构建基础镜像
FROM node:16-bullseye-slim as base
# set for base and all layer that inherit from it
ENV NODE_ENV production

# 2. 基于基础镜像构建一个包含全量依赖的镜像
FROM base as deps
WORKDIR /myapp
ADD package.json .npmrc ./
RUN npm install --production=false

# 3. 构建一个仅包含产线依赖的镜像，通过 npm prune 清理 DEV 依赖
FROM base as production-deps
WORKDIR /myapp
COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json ./
RUN npm prune --production

# 4. 构建用户部署的镜像，并执行部署
FROM base as build
WORKDIR /myapp
# 拷贝所有文件
ADD . .
RUN rm -rf /myapp/node_modules
COPY --from=deps /myapp/node_modules /myapp/node_modules
RUN npm run build

# 5. 最后，构建用于运行的最终镜像
FROM base
ENV NODE_ENV="production"
WORKDIR /myapp
# 拷贝运行时依赖
COPY --from=production-deps /myapp/node_modules /myapp/node_modules
# 拷贝应用产物
COPY --from=build /myapp/.next /myapp/.next
# 拷贝 package.json
COPY --from=build /myapp/package.json /myapp/package.json
# 拷贝启动命令
COPY --from=build /myapp/start.sh /myapp/start.sh

RUN chmod 777 /myapp/start.sh

EXPOSE 3000

ENTRYPOINT [ "./start.sh" ]
