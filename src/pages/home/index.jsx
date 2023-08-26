import { useEffect } from "react";
import LeftMenu from "./left_menu";
import MiddleWall from "./middle_wall";
import RightMenu from "./right_menu";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/auth");
    });
    return () => unsubscribe();
  });
  return (
    <div className=" bg-slate-900  ">
      <div className="flex  items-start justify-center  ">
        {/*left menu*/}
        <div className="w-2/5  hidden md:block text-white  h-12 pl-32 py-4">
          <LeftMenu />
        </div>
        <div className="w-3/5  border border-gray-600    border-t-0">
          {/*middle wall*/}
          <MiddleWall />
        </div>
        <div className="w-2/5  hidden lg:block h-12">
          {/*right menu*/}
          <RightMenu />
        </div>
        <div></div>
      </div>
    </div>
  );
}
