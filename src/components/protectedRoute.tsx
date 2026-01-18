import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
