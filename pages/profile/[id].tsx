import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils/client";
interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}
const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const [showUserVideos, setshowUserVideos] = useState(true);
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const [videoList, setVideoList] = useState<Video[]>([]);
  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideos);
    } else {
      setVideoList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);
  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full items-center">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            alt="Suggested User"
            className="rounded-full"
            layout="responsive"
          />
        </div>
        <div>
          <p className="flex md:text-2xl tracking-wider gap-1 items-center text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400 " />
          </p>
          <p className="capitalize md:text-xl text-gray-400">{user.userName}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setshowUserVideos(true)}>
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setshowUserVideos(false)}>
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videoList.length  ? videoList.map((post:Video , idx:number) => (
            <VideoCard post={post} key={idx} />
          )):<NoResult text={`No ${showUserVideos?'':'Liked'} Videos Yet!`}/>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: {
      data: res.data,
    },
  };
};
