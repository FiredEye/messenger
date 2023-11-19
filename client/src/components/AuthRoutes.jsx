import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../features/Storage";

const AuthRoutes = () => {
  const user = getUser();

  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthRoutes;
