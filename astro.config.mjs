import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Every page is static: prerender at build time instead of rendering per request.
  output: "static",
  adapter: vercel(),
  site: "https://www.dentalbarcelo.com",
  integrations: [
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es", en: "en" } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
