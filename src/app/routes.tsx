import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LoginPage } from "./components/LoginPage";
import { WelcomePage } from "./components/WelcomePage";
import { Dashboard } from "./components/Dashboard";
import { HistoryPage } from "./components/HistoryPage";
import { InsightsPage } from "./components/InsightsPage";
import { SettingsPage } from "./components/SettingsPage";
import { RequireAuth } from "./components/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "welcome",
        Component: WelcomePage,
      },
      {
        path: "app",
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },
          { path: "history", Component: HistoryPage },
          { path: "insights", Component: InsightsPage },
          { path: "settings", Component: SettingsPage },
        ],
      },
    ],
  },
]);
