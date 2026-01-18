import { useSelector } from "react-redux";
import type { RootState } from "@/api/store";

export const useAuth = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  return {
    isAuthenticated: Boolean(token),
    user,
    token,
  };
};
