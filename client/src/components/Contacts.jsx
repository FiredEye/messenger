import React, { useState, useEffect } from "react";
import { Avatar } from "@material-tailwind/react";
import { getUser } from "../features/Storage";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const data = getUser();
    setCurrentUserName(data.fullname);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="col-span-1 md:col-span-1 flex flex-col justify-between overflow-hidden h-full ">
          <div className="h-[15%] md:h-[10%] flex justify-center items-center border-b-[3px] border-gray-300 py-7">
            <h3 className="text-[36px] font-bold">WeChat</h3>
          </div>
          <div className="h-[69%] md:h-[78%] flex flex-col items-start overflow-auto gap-3 px-2 border-b-[3px] border-gray-300 py-4 pl-2">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`bg-[#ffffff34] min-h-[65px] cursor-pointer w-full p-1 ps-2 flex gap-4 items-center transition-[ease-in-out] duration-[0.5s] ${
                    index === currentSelected ? "bg-[#9a86f3]" : ""
                  } hover:bg-[#9a86f3] rounded-lg`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="relative">
                    <Avatar
                      src={contact.avatarImage}
                      alt="avatar image"
                      className="h-12"
                    />
                    {contact.isActive && (
                      <div className="absolute rounded-[50px] h-[8px] w-[8px] bg-green-600 bottom-[4px] right-[4px] border-white border-[.5px]"></div>
                    )}
                  </div>
                  <div className="username">
                    <h3>{contact.fullname}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-[16%] md:h-[12%] flex justify-start items-center gap-6 px-3">
            <div className="avatar">
              <Avatar
                src={currentUserImage}
                alt="current user avatar"
                className="h-14 w-14 "
              />
            </div>
            <div className="username text-[20px] text-bold">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
