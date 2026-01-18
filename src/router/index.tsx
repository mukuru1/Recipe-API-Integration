import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/landingPage";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import ProtectedRoute from "@/components/protectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

export default router;
