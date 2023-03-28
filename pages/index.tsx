import { NextPage } from "next";
import React from "react";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResult from "../components/NoResult";
import { BASE_URL } from "../utils/client";
interface IProps {
  videos: Video[];
}
const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard key={video._id} post={video} />)
      ) : (
        <NoResult text="No Videos" />
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: { videos: response.data },
  };
};
export default Home;
