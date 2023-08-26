import { useState } from "react";
import moment from "moment/moment";
import Modal from "./Modal";
import defaultAvatar from "../../../../../../assets/avatarDefault.svg";
import { Link } from "react-router-dom";

export default function Header({ tweet }) {
  const { createdAt, user } = tweet;

  const date = createdAt?.toDate();

  // modal operations
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-shrink-0 p-4 pb-0 justify-between">
      <Link to={"/"} className="flex-shrink-0 group block">
        <div className="flex items-center ">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full bg-white text-black"
              src={user.photoURL ? user.photoURL : defaultAvatar}
              alt={user.displayName + "image"}
            />
          </div>
          <div className="ml-3">
            <p className="text-base leading-6 font-medium text-white">
              {user.displayName}
              <span className="text-sm leading-5 font-medium ms-2 text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                @{user.displayName} . {moment(date).fromNow()}
              </span>
            </p>
          </div>
        </div>
      </Link>
      {/* settings modal menu icon */}
      <div className="text-center  justify-end w-10">
        <button
          onClick={openModal}
          title="Comment"
          className=" w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
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
            <g>
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </g>
          </svg>
        </button>
      </div>
      {isOpen && <Modal tweet={tweet} closeModal={closeModal} />}
    </div>
  );
}
