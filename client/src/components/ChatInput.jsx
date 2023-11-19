import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import { Button, Input } from "@material-tailwind/react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prev) => prev + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setShowEmojiPicker(false);
      setMsg("");
    }
  };

  return (
    <div className="h-[16%] md:h-[12%] flex gap-4 items-center px-3 md:px-4 w-full ">
      <div className="flex items-center gap-4 relative">
        <BsEmojiSmileFill
          onClick={handleEmojiPickerhideShow}
          className="text-[38px] cursor-pointer"
        />
        {showEmojiPicker && (
          <div className="absolute top-[-465px] left-[20px]">
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <form
        className="w-[95%] flex items-center gap-4"
        onSubmit={(event) => sendChat(event)}
      >
        <Input
          type="text"
          placeholder="type your message here..."
          className="!border !border-gray-700 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 text-white"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[100px]" }}
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <Button
          type="submit"
          className="text-[16px] md:text-[28px] md:py-[2.7px] px-[16px]"
        >
          <IoMdSend />
        </Button>
      </form>
    </div>
  );
}
