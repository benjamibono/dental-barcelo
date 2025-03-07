/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.webp" {
  const content: string;
  export default content;
}
