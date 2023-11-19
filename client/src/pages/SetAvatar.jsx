import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import loader from "../assets/loader.gif";
import axios from "axios";
import { setAvatarRoute } from "../utils/ApiRoutes";
import { toast } from "react-toastify";
import { getUser, setUser } from "../features/Storage";

const SetAvatar = () => {
  const nav = useNavigate();
  const api = `https://api.multiavatar.com`;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [avatars, setAvatars] = useState([]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      const user = getUser();

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        avatarImage: avatars[selectedAvatar],
        isAvatarImageSet: true,
      });

      if (data.status) {
        user.isAvatarImageSet = true;
        user.avatarImage = avatars[selectedAvatar];
        setUser(user);
        nav("/");
        toast.success(data.msg);
      } else {
        toast.error("Error setting avatar. Please try again.");
      }
    }
  };
  useEffect(() => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = `${api}/${Math.round(Math.random() * 1000)}.png`;
      data.push(image);
      setAvatars(data);
    }
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return (
    <>
      {isLoading ? (
        <Card
          color="transparent"
          shadow={false}
          className="mx-auto max-w-sm  mt-20 space-y-9 text-center"
        >
          <img src={loader} alt="loader" className=" w-full" />
        </Card>
      ) : (
        <Card
          color="transparent"
          className="mx-auto max-w-xl mt-20 space-y-9 text-center"
        >
          <Typography
            variant="h5"
            color="blue-gray"
            className="my-2 py-2 border-y-2"
          >
            Pick an Avatar as your profile picture
          </Typography>

          <CardBody className="avatars flex gap-8 justify-center">
            {avatars.map((avatar, index) => (
              <Avatar
                key={avatar}
                src={avatar}
                alt="avatar"
                className={`${
                  selectedAvatar === index
                    ? "border-[5px] border-solid border-gray-800"
                    : ""
                } h-[20%] w-[20%] object-cover cursor-pointer`}
                onClick={() => setSelectedAvatar(index)}
              />
            ))}
          </CardBody>
          <Button onClick={setProfilePicture} size="lg" className="mt-6">
            Set as Profile Picture
          </Button>
        </Card>
      )}
    </>
  );
};

export default SetAvatar;
