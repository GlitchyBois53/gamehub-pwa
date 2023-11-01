import Link from "next/link";
import Vr from "../shared/Vr";
import { useCallback, useEffect, useRef, useState } from "react";

export default function FriendInfo({ id, image, username, email, isBigCard }) {
  // Create a ref to the container element
  const ref = useRef(null);

  // Create a state variable to store the maximum width of the container and the window width
  const [maxWidth, setMaxWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Define a function to debounce the resize event listener
  function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  // Define a function to handle the resize event
  const handleResize = useCallback(
    debounce(() => {
      setMaxWidth(ref.current?.clientWidth);
      setWindowWidth(window.innerWidth);
    }, 100),
    []
  );

  // Set the initial maximum width of the container
  useEffect(() => {
    setMaxWidth(ref.current?.clientWidth);
    setWindowWidth(window.innerWidth);
  }, []);

  // Add a resize event listener to the window
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Remove the resize event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <Link
      href={`/profile/${id}`}
      className="flex gap-[10px] h-full items-center w-full"
      ref={ref}
    >
      <img
        src={image}
        alt={`${username}-profile-pic`}
        className="w-[46px] rounded-full object-cover aspect-square"
      />
      <Vr />
      <article style={{ maxWidth: `${maxWidth - (isBigCard ? 80 : 67)}px` }}>
        <h3 className="tracking-[0.96px] font-bold uppercase truncate">
          {username}
        </h3>
        <h4 className="tracking-[0.72px] text-xs font-medium opacity-50 truncate">
          {email}
        </h4>
      </article>
    </Link>
  );
}
