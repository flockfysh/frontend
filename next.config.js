/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    images: {
        remotePatterns: [
            { hostname: '*.digitaloceanspaces.com' }
        ]
    }
};

module.exports = nextConfig;
