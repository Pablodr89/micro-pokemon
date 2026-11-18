import react from "@vitejs/plugin-react";
// import react, { reactCompilerPreset } from "@vitejs/plugin-react";
// import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import originFederation from "@originjs/vite-plugin-federation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const federation = originFederation as unknown as (options: any) => any;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        homeApp: "http://localhost:5001/assets/remoteEntry.js",
        teamsApp: "http://localhost:5002/assets/remoteEntry.js",
        combatApp: "http://localhost:5003/assets/remoteEntry.js",
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
    tailwindcss(),
    // babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    port: 5000,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
