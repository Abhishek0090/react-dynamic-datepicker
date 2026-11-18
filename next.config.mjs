// Only needed when the site is served from a sub-path, such as GitHub Pages
// ("/react-dynamic-datepicker"). Leave it empty for local dev and Vercel.
const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
