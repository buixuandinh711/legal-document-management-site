import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = "dinhbx";

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
