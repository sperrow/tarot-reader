import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginRadar } from 'vite-plugin-radar';

export default defineConfig({
    plugins: [
        VitePluginRadar({
            // Google Tag Manager (multiple tag can be set with an array)
            gtm: [{ id: 'GTM-TPS27J3N' }],
        }),
        react(),
    ],
    base: '/tarot-reader/',
});
