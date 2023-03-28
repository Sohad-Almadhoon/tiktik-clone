import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils/client";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
const Search = ({ videos }: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const { allUsers} = useAuthStore();
  const isVideos = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const accounts = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
    const { searchTerm }:any = useRouter().query;
    const searchedAccounts = allUsers.filter(
      (user:IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(true)}>
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length ? (
            searchedAccounts.map((user: IUser, i) => (
              <Link key={i} href={`/profile/${user._id}`}>
                <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user-profile"
                      src={user.image}
                    />
                  </div>
                  <div>
                    <div>
                      <p className="flex gap-1 items-center text-lg font-bold text-primary">
                        {user.userName} <GoVerified className="text-blue-400" />
                      </p>
                      <p className="capitalize text-gray-400 text-sm">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResult text={`No accounts results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, i) => <VideoCard post={video} key={i} />)
          ) : (
            <NoResult text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: {
      videos: data,
    },
  };
};
