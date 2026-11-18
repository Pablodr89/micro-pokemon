import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { AppRoutes } from "./AppRoutes";
import { lazy } from "react";
import { useNavigate } from "react-router-dom";

const HomeRemote = lazy(() => import("homeApp/Home"));
const TeamsRemote = lazy(() => import("teamsApp/Teams"));
const CombatRemote = lazy(() => import("combatApp/Combat"));

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={AppRoutes.Home} element={<HomeRemote />} />
        <Route
          path={AppRoutes.Teams}
          element={
            <TeamsRemote onStartCombat={() => navigate(AppRoutes.Combat)} />
          }
        />
        <Route path={AppRoutes.Combat} element={<CombatRemote />} />
      </Route>
    </Routes>
  );
}

// 2. El componente principal solo monta el BrowserRouter
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
