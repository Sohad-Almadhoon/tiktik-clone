import Image from "next/image";
import Link from "next/link";
import React, { useState , useEffect} from "react";
import Logo from "../utils/tiktik-logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setsearchValue] = useState("");
  const router = useRouter();
  const handleSearch = (e: { preventDefault :()=>void}) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="relative md:h-[30px] h-[38px] w-[100px] md:w-[130px] ">
          <Image className="cursor-pointer" src={Logo} alt="tiktik" fill />
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setsearchValue(e.target.value)}
            placeholder="Search accounts amd videos"
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:[350px] rounded-full md:top-0"
          />
          <button onClick={handleSearch} className ="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"><BiSearch /></button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 items-center">
            <Link href="/upload">
              <button className="border-2 px-2 flex md:px-4 text-md font-semibold items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block"> Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="">
                <Image
                  src={userProfile.image}
                  alt="profile shoot"
                  className="rounded-full cursor-pointer"
                  height={40}
                  width={40}
                />
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}>
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => {
              createOrGetUser(res, addUser);
            }}
            onError={() => {
              console.log("login Failed");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
