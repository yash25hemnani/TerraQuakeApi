import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@images": path.resolve(__dirname, "./src/assets/images"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@config": path.resolve(__dirname, "./src/config"),
			"@pages": path.resolve(__dirname, "./src/pages"),
		}
	}
});
// Add more aliases as and when required