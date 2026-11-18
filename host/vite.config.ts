import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import originFederation from "@originjs/vite-plugin-federation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const federation = originFederation as unknown as (options: any) => any;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const home = env.HOME_URL ?? "http://localhost:5001";
  const teams = env.TEAMS_URL ?? "http://localhost:5002";
  const combat = env.COMBAT_URL ?? "http://localhost:5003";

  return {
    plugins: [
      react(),
      federation({
        name: "host",
        remotes: {
          homeApp: `${home}/assets/remoteEntry.js`,
          teamsApp: `${teams}/assets/remoteEntry.js`,
          combatApp: `${combat}/assets/remoteEntry.js`,
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
  };
});
