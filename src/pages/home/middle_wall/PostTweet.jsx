import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import defaultAvatar from "../../../assets/avatarDefault.svg";
import Picker from "emoji-picker-react";
import {
  // uploadBytesResumable,
  ref,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

export default function PostTweet() {
  const [user, setUser] = useState(null);
  const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const EmojiRef = useRef(null);
  // get collection reference
  const tweetsCollectionRef = collection(db, "tweets");

  //check user status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        setUser(user);
        // const emailVerified = user.emailVerified;
      } else {
        // User is signed out
        toast.error("I can't react user profile.");
      }
    });
    return () => unsubscribe();
  }, []);

  const displayName = user?.displayName;
  // const email = user?.email;
  const photoURL = user?.photoURL;
  const uid = user?.uid;

  //selected file
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  //upload Image

  const uploadImage = async (image) => {
    if (!image) {
      return;
    } else {
      // Create a reference to image with different name
      const imageRef = ref(
        storage,
        `images/${new Date().getTime()}${image.name}`
      );

      // first way of getting downloadURL
      try {
        const snapshot = await uploadBytes(imageRef, image); // Upload the image

        if (snapshot) {
          console.log("Uploaded a blob or file!");
        }

        const downloadURL = await getDownloadURL(snapshot.ref); // Get the download URL

        // Log the download URL
        // console.log(downloadURL);

        return downloadURL;
      } catch (error) {
        toast.error("Error uploading image:", error);
      }

      //second way of getting downloadURL
      //   const uploadTask = uploadBytesResumable(imageRef, image);
      //   uploadTask.on(
      //     "state_changed",
      //     (snapshot) => {
      //       const progress =
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //       toast.info(`Upload is ${progress} % done`);
      //       setProgress(progress);
      //       console.log(progress);

      //       switch (snapshot.state) {
      //         case "paused":
      //           toast.info("Upload is paused");

      //           break;
      //         case "running":
      //           toast.info("Upload is running");
      //           break;

      //         default:
      //           break;
      //       }
      //     },
      //     (error) => {
      //       switch (error.code) {
      //         case "storage/unauthorized":
      //           // User doesn't have permission to access the object
      //           toast.error(error.code);
      //           break;
      //         case "storage/canceled":
      //           // User canceled the upload
      //           toast.error(error.code);

      //           break;

      //         // ...

      //         case "storage/unknown":
      //           // Unknown error occurred, inspect error.serverResponse
      //           toast.error(error.code);

      //           break;
      //       }
      //     },
      //     () =>
      //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //         console.log("File available at ", downloadURL);
      //         setdownloadURL(downloadURL);
      //       })
      //   );
    }
  };

  // form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const textContent = message;
    const imageContent = image;

    if (!textContent && !imageContent) {
      toast.warn("Create a post");
      return;
    }

    //first upload image
    let imageUrl = "";

    if (imageContent) {
      // get download url
      imageUrl = await uploadImage(imageContent);
    }

    try {
      await addDoc(tweetsCollectionRef, {
        content: {
          textContent,
          imageContent: imageUrl,
        },
        interaction: {
          likes: [],
          retweets: [],
        },
        createdAt: serverTimestamp(),
        user: {
          displayName,
          photoURL: photoURL ? photoURL : defaultAvatar,
          uid,
        },
      }).then((result) => {
        console.log("message id:", result.id);
      });
      // console.log("Document written with ID: ", docRef.id);
      toast.success("Message sent");
      // Empty  inputs
      setMessage("");
      setImage("");
      setIsEmojiMenuOpen(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Error adding document: ", e);
    }
  };

  const toggleEmojiMenu = () => {
    setIsEmojiMenuOpen((prev) => !prev);
  };

  const onEmojiClick = (emojiObject, event) => {
    console.log(event);
    setChosenEmoji(emojiObject);

    const cursor = EmojiRef.current.selectionStart;
    console.log("cursor", cursor);
    const text =
      message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor);
    setMessage(text);
  };

  return (
    <>
      {/*middle create tweet*/}
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="m-2 w-10 py-1">
            <img
              className={
                photoURL
                  ? "inline-block h-10 w-10 rounded-full"
                  : "inline-block h-10 w-10 rounded-full bg-white p-1"
              }
              src={photoURL ? photoURL : defaultAvatar}
              alt={displayName + " image"}
            />
          </div>

          <div className="flex-1 px-2 pt-2 mt-2 pe-3">
            <textarea
              id="message"
              name="message"
              ref={EmojiRef}
              className=" bg-transparent resize-y  text-gray-400 font-medium text-lg w-full"
              rows={2}
              cols={50}
              placeholder="What's happening?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
              }}
            />
            {isEmojiMenuOpen && <Picker onEmojiClick={onEmojiClick} />}
          </div>
        </div>
        {/*middle create tweet below icons*/}

        <div className="flex">
          <div className="w-10" />
          <div className="w-64 px-2">
            <div className="flex items-center">
              {/* select file  icon */}
              <label htmlFor="file-input">
                <div className="flex-1 text-center px-1 py-1 m-2">
                  <span
                    role="button"
                    className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
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
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                className="invisible"
                name="image"
                // value={formData.image}
                accept="image/*"
                onChange={handleImageChange}
              />
              {/*  retweet icon */}
              <div className="flex-1 text-center py-2 m-2">
                <a
                  href="#"
                  className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                >
                  <svg
                    className="text-center h-7 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    title="Retweet"
                  >
                    <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
              {/* play video icon */}
              <div className="flex-1 text-center py-2 m-2">
                <a
                  href="#"
                  className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                >
                  <svg
                    className="text-center h-7 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    title="Add video"
                  >
                    <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
              {/* emoji  icon */}
              <div className="flex-1 text-center py-2 m-2">
                <button
                  type="button"
                  role="dialog"
                  onClick={() => {
                    toggleEmojiMenu();
                  }}
                  className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
                >
                  <svg
                    className="text-center h-7 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    title="Like"
                  >
                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-400 mt-5 hover:bg-blue-600 text-white font-semibold py-2 px-7 rounded-full mr-8 float-right focus:ring-2 focus:ring-white-600 focus:ring-offset-2"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
