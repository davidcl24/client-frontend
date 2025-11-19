import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    // domains: ['es.web.img3.acsta.net', 'es.web.img2.acsta.net'], // agrega aquí tu host externo
  },
};

export default nextConfig;
