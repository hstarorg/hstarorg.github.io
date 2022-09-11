import withAntdLess from 'next-plugin-antd-less';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  ...withAntdLess({}),
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['landkit.goodthemes.co'],
  },
};

export default nextConfig;
