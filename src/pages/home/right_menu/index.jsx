import SearchBar from "./SearchBar";
import Trends from "./Trends";
import WhoToFollow from "./WhoToFollow";

export default function RightMenu() {
  return (
    <>
      <SearchBar />
      {/*second-trending tweet section*/}
      <Trends />
      {/*third-people suggetion to follow section*/}
      <WhoToFollow />
      <div className="flow-root m-6 ">
        <div className="flex-1">
          <a href="#">
            <p className="text-sm leading-6 font-medium text-gray-500">
              Terms Privacy Policy Cookies Imprint Ads info
            </p>
          </a>
        </div>
        <div className="flex-2">
          <p className="text-sm leading-6 font-medium text-gray-600">
            © 2023 Twitter, Inc.
          </p>
        </div>
      </div>
    </>
  );
}
