import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import VotepollingPage from "@/pages/VotepollingPage";
import CreatePollingPage from "@/pages/CreatepollingPage";
import PrivateRoute from "@/components/auth/PrivateRoute";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-polling"
            element={
              <PrivateRoute>
                <CreatePollingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vote-polling"
            element={
              <PrivateRoute>
                <VotepollingPage />
              </PrivateRoute>
            }
          />

          {/* Default Route - Redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 - Redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
