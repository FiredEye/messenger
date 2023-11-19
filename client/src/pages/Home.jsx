import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../features/Storage";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/ApiRoutes";
import ChatContainer from "../components/ChatContainer.jsx";
import Contacts from "../components/Contacts.jsx";
import Welcome from "../components/Welcome.jsx";
import axios from "axios";
import { Card } from "@material-tailwind/react";

const Home = () => {
  const nav = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const fetchData = () => {
      if (!getUser()) {
        nav("/login");
      } else {
        setCurrentUser(getUser());
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);

            setContacts(data.data);
          } else {
            nav("/setAvatar");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center gap-4">
        <Card className="w-[85vw] h-[85vh] grid  grid-cols-3 md:grid-cols-4 rounded-lg overflow-hidden bg-gray-800 text-white">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </Card>
      </div>
    </>
  );
};

export default Home;
