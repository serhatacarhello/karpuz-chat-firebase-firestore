import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import avatarDefault from "../assets/avatarDefault.svg";
import { auth } from "../firebase/config";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUser(user);
      } else {
        toast.error("Please sign in to access your profile.");
        navigate("/auth"); // Redirect to authentication page if not signed in
      }
    });
    return () => unsubscribe();
  }, []);

  const displayName = user?.displayName;
  const email = user?.email;
  const photoURL = user?.photoURL;
  const username = email?.split("@")[0];

  const logoutFunc = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged Out");
        navigate("/auth"); // Redirect to authentication page after logout
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex items-top justify-center bg-slate-600 h-screen">
      <div className=" flex-1  bg-white   shadow-md">
        <div className="flex h-20 bg-slate-300 w-full items-center  justify-between  ">
          <div className="flex items-center space-x-4 ">
            <img
              className="h-16 w-16  rounded-full"
              src={photoURL ? photoURL : avatarDefault}
              alt={displayName}
            />
            <div>
              <p className="text-lg font-semibold">{displayName}</p>
              <p className="text-gray-500">@{username}</p>
            </div>
          </div>
          <div className=" px-6 ">
            <button
              onClick={logoutFunc}
              className="bg-red-500  text-white px-4 py-2 rounded-md font-semibold whitespace-nowrap"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
