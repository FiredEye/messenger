import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { getUser } from "../features/Storage";
import { recieveMessageRoute, sendMessageRoute } from "../utils/ApiRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMsg = async () => {
      const data = getUser();
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };

    fetchMsg();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = getUser();

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="col-span-2 md:col-span-3 flex flex-col justify-between overflow-hidden h-full  border-gray-300 border-l-[3px]   ">
      <div className="h-[15%] md:h-[10%] flex justify-between items-center px-8 py-7 border-gray-300 border-b-[3px] ">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <img
              src={currentChat.avatarImage}
              alt="current user image"
              className="h-12"
            />
          </div>
          <div className="username">
            <h3>{currentChat.fullname}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="h-[69%] md:h-[78%] py-4 px-8 flex flex-col gap-[10px] overflow-auto border-gray-300 border-b-[3px] ">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuid()}>
              <div
                className={`flex items-center ${
                  message.fromSelf ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[40%] break-words py-[6px] px-4 text-[18px] md:max-w-[70%] text-gray-900 ${
                    message.fromSelf
                      ? "bg-purple-100 rounded-l-2xl rounded-br-2xl"
                      : "bg-blue-100 rounded-bl-2xl rounded-r-2xl"
                  }`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
