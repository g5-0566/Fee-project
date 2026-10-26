import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],

    // GitHub Pages serves this repository under its repository name. Keep the
    // existing local development URL base for the user's local setup.
    base: process.env.GITHUB_PAGES === 'true' ? '/Fee-project/' : '/feeProject/',

    server: {
        host: '127.0.0.1'
    }
});
