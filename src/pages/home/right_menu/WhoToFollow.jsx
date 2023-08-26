import React from "react";

export default function WhoToFollow() {
  return (
    <div className="max-w-sm rounded-lg bg-blue-800 overflow-hidden shadow-lg m-4 mr-20">
      <div className="flex">
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">
            Who to follow
          </h2>
        </div>
      </div>
      <hr className="border-gray-600" />
      {/*first person who to follow*/}
      <div className="flex flex-shrink-0">
        <div className="flex-1 ">
          <div className="flex items-center w-48">
            <div>
              <img
                className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
              />
            </div>
            <div className="ml-3 mt-3">
              <p className="text-base leading-6 font-medium text-white">
                Elon Musk
              </p>
              <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                @ElonMusk
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 py-2 m-2">
          <a className=" float-right">
            <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
              Follow
            </button>
          </a>
        </div>
      </div>
      <hr className="border-gray-600" />
      {/*second person who to follow*/}
      <div className="flex flex-shrink-0">
        <div className="flex-1 ">
          <div className="flex items-center w-48">
            <div>
              <img
                className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
              />
            </div>
            <div className="ml-3 mt-3">
              <p className="text-base leading-6 font-medium text-white">
                SpaceX
              </p>
              <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                @SpaceX
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 py-2 m-2">
          <a className=" float-right">
            <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
              Follow
            </button>
          </a>
        </div>
      </div>
      <hr className="border-gray-600" />
      {/*show more*/}
      <div className="flex">
        <div className="flex-1 p-4">
          <h2 className="px-4 ml-2 w-48 font-bold text-blue-400">Show more</h2>
        </div>
      </div>
    </div>
  );
}
