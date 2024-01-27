/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["api.ricogann.com"],
        unoptimized: true,
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
};

module.exports = nextConfig;
