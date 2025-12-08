/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                pathname: '/f/**',
            },
            {
                protocol: 'https',
                hostname: '**.ufs.sh',
                pathname: '/f/**',
            },
            {
                protocol: 'https',
                hostname: 'uploadthing.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '**.unsplash.com',
            },
        ],
    },
};

export default nextConfig;
