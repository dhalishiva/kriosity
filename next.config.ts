import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// The blog (kriosity.in/blog) is a separate app: repo dhalishiva/kriosityblog,
// Vercel project "kriosity-blog", built with basePath "/blog". We proxy to it here.
const BLOG_ORIGIN = process.env.BLOG_ORIGIN || "https://kriosity-blog.vercel.app";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/blog", destination: `${BLOG_ORIGIN}/blog` },
        { source: "/blog/:path*", destination: `${BLOG_ORIGIN}/blog/:path*` },
      ],
    };
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/marketplace", destination: "/products", permanent: true },
      { source: "/shop", destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;
