import { Navigate } from "react-router";
import { useAppSelector } from "../App/store";

interface IProtectedRoute {
  reverse?: boolean;
  path: string;
  children: React.ReactNode;
}
const ProtectedRoute = ({ reverse, path, children }: IProtectedRoute) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isAllowed = reverse ? !isAuthenticated : isAuthenticated;
  if (!isAllowed) return <Navigate to={path} replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
