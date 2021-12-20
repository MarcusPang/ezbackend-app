module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc', 'lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
