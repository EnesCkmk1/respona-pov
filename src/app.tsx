import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const path = window.location.pathname;

  if (path.startsWith("/dashboard")) {
    return <DashboardPage />;
  }

  return <HomePage />;
}
