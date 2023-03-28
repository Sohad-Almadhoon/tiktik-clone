import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";
interface IProps {
  likes: any[];
  handleLike: () => void;
  handleDisLike: () => void;
}
const LikeButton = ({ likes, handleLike, handleDisLike }: IProps) => {
  const { userProfile } = useAuthStore();
  const [alreadyLiked, setalreadyLiked] = useState(false);
  let filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile?._id
  );
  

  useEffect(() => {
    if (filterLikes?.length) {
      setalreadyLiked(true);
    } else {
      setalreadyLiked(false);
    }
  }, [likes, filterLikes]);
  return (
    <div className="gap-6 flex">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full text-[#f51997]"
            onClick={handleDisLike}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            onClick={handleLike}
            className="bg-primary rounded-full text-[#000]">
            {" "}
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
