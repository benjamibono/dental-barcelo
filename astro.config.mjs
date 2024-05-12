import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://dental-barcelo-web.pages.github.io',
  base: 'dental-barcelo-web',
  integrations: [tailwind()]
});
