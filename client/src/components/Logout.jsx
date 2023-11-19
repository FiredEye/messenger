import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { logoutRoute } from "../utils/ApiRoutes";
import { getUser } from "../features/Storage";
const Logout = () => {
  const nav = useNavigate();
  const handleClick = async () => {
    const id = getUser()._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      nav("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff className="text-[20px]" />
    </Button>
  );
};
export default Logout;
