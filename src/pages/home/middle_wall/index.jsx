import Header from "./MainHeader";
import PostTweet from "./PostTweet";
import MessageCard from "./message-card";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useEffect, useState } from "react";

export default function MiddleWall() {
  const [tweets, setTweets] = useState(null);

  // create a query
  const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tweets = [];
      snapshot.forEach((doc) => {
        tweets.push({ ...doc.data(), id: doc.id });
        setTweets(tweets);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <hr className="border-gray-600" />
      <PostTweet />
      <hr className="border-blue-800 border-4 rounded-full" />
      <div></div>
      {/*first tweet start*/}
      {!tweets && (
        <div className="my-5">
          <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10" />
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded" />
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2" />
                    <div className="h-2 bg-slate-200 rounded col-span-1" />
                  </div>
                  <div className="h-2 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {tweets?.map((tweet) => (
        <MessageCard key={tweet.id} tweet={tweet} />
      ))}
      {/* second tweet */}
      <hr className="border-gray-600" />
      {/*third tweet*/}
    </>
  );
}
