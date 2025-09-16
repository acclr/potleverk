const advancedHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on"
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block"
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin"
  }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  images: {
    deviceSizes: [64, 512, 768, 1024, 1920],
    dangerouslyAllowSVG: true,
    domains: [
      "encrypted-tbn0.gstatic.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "images.prismic.io",
      "plus.unsplash.com",
      "images.prismic.io",
      "flowbite.s3.amazonaws.com",
      "images.unsplash.com",
      "images.hdqwalls.com",
      "source.unsplash.com",
      "accelor.cdn.prismic.io",
      "potleverk.cdn.prismic.io",
      "placehold.co"
    ]
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: advancedHeaders
      }
    ];
  }
};

module.exports = nextConfig;