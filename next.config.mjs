/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/user",
        has: [{ type: "cookie", key: "user", value: "ADMIN" }],
        destination: "/user/admin",
        permanent: false,
      },
      {
        source: "/user",
        has: [{ type: "cookie", key: "user", value: "CUSTOMER" }],
        destination: "/user/customer",
        permanent: false,
      },
      {
        source: "/user",
        has: [{ type: "cookie", key: "user", value: "not-registered" }],
        destination: "/user/register",
        permanent: false,
      },
      {
        source: "/user/register",
        has: [{ type: "cookie", key: "user", value: "CUSTOMER" }],
        destination: "/",
        permanent: false,
      },
    ];
  },

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental: {
    esmExternals: false, // THIS IS THE FLAG THAT MATTERS
  },
};

export default config;
