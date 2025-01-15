import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel(),
  // otras configuraciones
  build: {
    outDir: 'dist',
  },
  // asegúrate de que las rutas estén configuradas correctamente
});