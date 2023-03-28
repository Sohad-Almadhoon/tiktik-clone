import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";
import { BASE_URL } from "../../utils/client";
interface IProps {
  postDetails: Video;
}
const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setisVideoMuted] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const router = useRouter();
  const { userProfile } = useAuthStore();
  const onVideoClick = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };
  useEffect(() => {
    if (videoRef.current && post) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted, post]);
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.likes });
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });
      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };
  if (!post) return null;
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer " onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative ">
          <div className="lg-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={onVideoClick}></video>
          </div>
          <div className="absolute top-[45%] left-[45%]">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setisVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setisVideoMuted(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-20 md:h-20 w-16 h-16 ml-4">
              <Link href="/">
                <>
                  <Image
                    src={post.postedBy.image}
                    alt="profile shoot"
                    className="rounded"
                    height={63}
                    width={63}
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            {/* *************************** */}

            <div>
              <Link href="">
                <div className="flex gap-2 flex-col mt-3">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <p className="px-10 text-lg text-gray-600">{post.caption}</p>
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDisLike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
            comments={post.comments}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: { postDetails: data },
  };
};
