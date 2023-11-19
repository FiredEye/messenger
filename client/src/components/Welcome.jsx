import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
import { getUser } from "../features/Storage";
const Welcome = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(getUser().fullname);
  }, []);
  return (
    <div className="col-span-2 md:col-span-3 flex justify-center items-center flex-col border-l-[3px] border-gray-300 text-[18px]">
      <img src={Robot} alt="robot image" className="h-80" />
      <h1>
        Welcome,{" "}
        <span className="text-[#85b9f5] text-[22px] text-bold">
          {userName}!
        </span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};
export default Welcome;
