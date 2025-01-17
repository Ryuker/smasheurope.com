// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vue from '@astrojs/vue';

import icon from 'astro-icon';

import relativeLinks from 'astro-relative-links';

// const url = 'https://github.com/Ryuker/smasheurope-astrojs/docs/';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue(), relativeLinks(),
    icon({
      iconDir: "src/assets/icons",
      include: {
        // mdi: ["*"], // (Default) Loads entire Material Design Icon set
        // mdi: ["account"], // Loads only Material Design Icon's "account" SVG
      }
    })
  ],
  // output: 'server',
  output: 'static',
  site: 'https://ryuker.github.io/',
  outDir: './dist/docs/',
  build: {
    assets: 'astro',
  },
});