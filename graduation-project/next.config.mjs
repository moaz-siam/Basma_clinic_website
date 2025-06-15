/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // يسمح بأي مسار تحت الدومين
      },
    ],
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET_KEY,
  },
};

export default nextConfig;
