import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import useAuthStore from "../store/authStore";
import NoResult from "./NoResult";
import { IUser } from "../types";
interface IProps {
  isPostingComment: Boolean;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comment: string;
  comments: IComment[];
}
interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id?: string };
}
const Comments = ({
  comment,
  setComment,
  addComment,
  isPostingComment,
  comments,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();
  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          <div>
            {comments.map((comment, index) => (
              <>
                {allUsers.map(
                  (user:IUser) =>(
                    user._id === (comment.postedBy._id || comment.postedBy._ref)
                && (
                  <div key={user._id}>
                    <Link href={`/profile/${user._id}`}>
                      <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center">
                        <div className="w-8 h-8">
                          <Image
                            src={user.image}
                            width={34}
                            height={34}
                            alt="Suggested User"
                            className="rounded-full"
                            layout="responsive"
                          />
                        </div>
                        <div className="hiddedn xl:block">
                          <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                            {user.userName.replaceAll(" ", "")}
                            <GoVerified className="text-blue-400 " />
                          </p>
                          <p className="capitalize text-xs text-gray-400">
                            {user.userName}
                          </p>
                        </div>
                      </div>
                        </Link>
                        <div>
                          {comment.comment}
                        </div>
                  </div>
                )))}
              </>
            ))}
          </div>
        ) : (
          <NoResult text="No Comments yet!" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={() => {}} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Add comment..."
              className="bg-promary px-6 py-4 text-md font-medium w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}{" "}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
