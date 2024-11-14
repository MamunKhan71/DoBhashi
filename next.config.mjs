/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "sea1.ingest.uploadthing.com"
            }
        ]
    }
};

export default nextConfig;
