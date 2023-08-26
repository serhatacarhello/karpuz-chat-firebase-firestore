import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../../../../../firebase/config";

export default function CommentModal({ tweet, closeCommentModal }) {
  const { interaction, id } = tweet;
  const tweetRef = doc(db, "tweets", id);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const comments = interaction?.comments;

  // console.log(comments);

  // set currentUser in comment message
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  });

  // console.log("currentUser", currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    // console.log("message", message);

    try {
      await updateDoc(tweetRef, {
        "interaction.comments": arrayUnion({
          message,
          id: currentUser?.uid,
          user: {
            photoURL: currentUser.photoURL,
            displayName: currentUser.displayName,
            id: currentUser.uid,
          },
        }),
      });
      setMessage("");
      // closeCommentModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="absolute min-w-[300px]  max-w-2xl mx-auto z-10">
        <div className="relative w-full max-w-md  h-full md:h-auto">
          {/* Modal content */}
          <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
            <div className="flex justify-between align-middle p-2">
              <h3 className="ps-1 font-semibold">Add a comment</h3>
              <button
                type="button"
                onClick={closeCommentModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* comments */}
            <div className="bg-white text-slate-700 mb-2">
              {comments && comments.length > 0 && (
                <div className="w-full p-2 bg-blue-400">
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <div className=" flex-1 flex items-center text-start justify-start   rounded-full bg-white ">
                        <img
                          className="h-7 w-7  p-1  rounded-full"
                          src={comment.user.photoURL}
                          alt={comment.user.displayName}
                        />
                        <p className="inline-block text-start  px-2 rounded-full bg-white ">
                          {comment.user.displayName}{" "}
                        </p>
                      </div>
                      <div className="flex items-start ps-1 rounded-lg bg-purple-500">
                        <p>{comment.message} </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
            >
              <div>
                <label
                  htmlFor="comment"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300 sr-only"
                >
                  Your comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  //borderless
                  // className="block w-full border-0 border-b-2 border-gray-200 focus:border-primary-500 focus:ring-0"
                  className="block p-2.5 resize-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
