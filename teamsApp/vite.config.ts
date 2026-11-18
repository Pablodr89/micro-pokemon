import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import originFederation from "@originjs/vite-plugin-federation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const federation = originFederation as unknown as (options: any) => any;

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base:
    command === "build"
      ? `${process.env.APP_URL ?? "http://localhost:5002"}/`
      : "/",
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
}));
