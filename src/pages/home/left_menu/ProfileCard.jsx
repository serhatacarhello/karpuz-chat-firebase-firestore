import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/config";
import { Link } from "react-router-dom";
import defaultAvatar from "../../../assets/avatarDefault.svg";

function ProfileCard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        setUser(user);
        // const emailVerified = user.emailVerified;
        // const uid = user.uid;
      } else {
        // User is signed out
        toast.error("I can't react user profile.");
      }
    });
    return () => unsubscribe();
  }, []);

  const displayName = user?.displayName;
  const email = user?.email;
  const photoURL = user?.photoURL;

  const username = email?.split("@")[0];

  return (
    <div className="flex-shrink-0 flex hover:bg-blue-00 rounded-full p-4 mt-12 mr-2">
      <Link to={"/profile"} className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-10 w-10 bg-white m-1 p-1 text-black rounded-full"
              src={photoURL ? photoURL : defaultAvatar}
              alt={displayName}
            />
          </div>
          <div className="ml-3">
            <p className="text-base leading-6 font-medium text-white">
              {displayName}
            </p>
            <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
              @{username}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProfileCard;
