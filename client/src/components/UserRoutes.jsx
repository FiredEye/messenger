import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../features/Storage";

const UserRoutes = () => {
  const user = getUser();

  return user ? <Navigate to={"/"} /> : <Outlet />;
};

export default UserRoutes;
