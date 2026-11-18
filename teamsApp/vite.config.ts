import react from "@vitejs/plugin-react";
// import react, { reactCompilerPreset } from "@vitejs/plugin-react";
// import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import originFederation from "@originjs/vite-plugin-federation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const federation = originFederation as unknown as (options: any) => any;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "teamsApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Teams": "./src/App.tsx", // Componente de gestión de equipos
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        zustand: {
          singleton: true,
        },
        "@mf/context": { singleton: true },
      },
    }),
    // babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    port: 5002,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
