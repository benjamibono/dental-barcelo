import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  base: "/dental-barcelo-web/", // Ruta base del sitio
  build: {
    cssCodeSplit: false, // Evitar la división de código CSS
    minify: "esbuild", // Minificar con esbuild
    rollupOptions: {
      output: {
        manualChunks: undefined, // Deshabilitar manualChunks
      },
    },
  },
  optimizeDeps: {
    include: ["path-to-regexp"], // Incluir path-to-regexp en las dependencias optimizadas
  },
  plugins: [
    tailwind(), // Integración de Tailwind CSS
    VitePWA({
      registerType: "autoUpdate", // Registro automático de actualizaciones
      manifest, // Configuración del archivo manifest
      workbox: {
        navigateFallback: "/dental-barcelo-web/index.html", // Ruta de fallback para la navegación
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: "CacheFirst", // Estrategia de caché
          },
          {
            urlPattern: /\.(?:woff|woff2|ttf|eot|ico)$/,
            handler: "CacheFirst", // Estrategia de caché
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000, // Puerto del servidor de desarrollo
  },
  site: "https://benjamibono.github.io", // URL del sitio
});
