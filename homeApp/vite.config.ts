import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import originFederation from "@originjs/vite-plugin-federation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const federation = originFederation as unknown as (options: any) => any;

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base:
    command === "build"
      ? `${process.env.APP_URL ?? "http://localhost:5001"}/`
      : "/",
  plugins: [
    react(),
    federation({
      name: "homeApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Home": "./src/App.tsx", // O el componente principal de la home
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
        "@mf/stores": { singleton: true },
        "@mf/context": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5001,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
}));
