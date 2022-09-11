import withAntdLess from 'next-plugin-antd-less';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  ...withAntdLess({}),
  /* config options here */
  images: {
    domains: ['landkit.goodthemes.co'],
  },
};

export default nextConfig;
