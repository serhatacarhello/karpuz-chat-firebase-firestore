import { db } from "../../../../../../firebase/config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import millify from "millify";
import CommentModal from "./comment-modal/Modal";

export default function Footer({ tweet }) {
  const { interaction, id, content, user } = tweet;
  const { imageContent } = content;
  const tweetDocRef = doc(db, "tweets", id);
  // const date = createdAt?.toDate();
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentModelOpen, setIsCommentModelOpen] = useState(false);
  // const keys = Object.keys(tweet);

  // watch changes on tweet
  useEffect(() => {
    if (interaction?.likes?.includes(user.uid)) {
      setIsLiked(true);
    } else setIsLiked(false);
  }, [tweet]);

  const handleCommentBtnClick = () => {
    setIsCommentModelOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModelOpen(false);
  };

  const handleRetweetClick = () => {
    //
  };

  const toggleLikeBtnClick = async () => {
    try {
      //remove
      if (isLiked) {
        await updateDoc(tweetDocRef, {
          "interaction.likes": arrayRemove(user.uid),
        });
        toast.success("Like removed");
      } else {
        //add
        await updateDoc(tweetDocRef, {
          "interaction.likes": arrayUnion(user.uid),
        });
        toast.success("Like added");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleShareClick = () => {
    //
  };

  const handleClick = () => {
    //
  };
  return (
    <>
      <div className="flex">
        <div className="w-full">
          <div className="flex items-center">
            <div className="flex-1 text-center relative">
              <button
                onClick={handleCommentBtnClick}
                title="Comment"
                className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              {isCommentModelOpen && (
                <CommentModal
                  tweet={tweet}
                  closeCommentModal={closeCommentModal}
                />
              )}
            </div>

            <div className="flex-1 text-center py-2 m-2">
              <button
                onClick={handleRetweetClick}
                title="Retweet"
                className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>
            <div className="flex-1  text-center py-2 m-2">
              <button
                onClick={toggleLikeBtnClick}
                title="Like"
                className={` ${
                  isLiked ? "text-red-500" : ""
                } w-12 mt-1 group flex items-center  text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800
                   hover:text-red-300 relative`}
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="inline-flex items-center  rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-inherit ring-1 ring-inset ring-yellow-600/20 absolute left-10 ">
                  {interaction?.likes &&
                    millify(interaction?.likes?.length, {
                      precision: 3,
                      lowercase: true,
                    })}
                </span>
              </button>
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <button
                onClick={handleShareClick}
                title="Share"
                className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <a href={imageContent} target="_blank" rel="noreferrer">
                <button
                  title="Download"
                  className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                >
                  <svg
                    className="text-center h-7 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                  </svg>
                </button>
              </a>
            </div>
            <div className="flex-1 text-center py-2 m-2">
              <button
                onClick={handleClick}
                title=""
                className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
