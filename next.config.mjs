import withAntdLess from 'next-plugin-antd-less';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  ...withAntdLess({}),
  /* config options here */
};

export default nextConfig;
