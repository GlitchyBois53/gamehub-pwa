"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { genres } from "../../constants";
import Button from "../shared/Button";
import UserCard from "./UserCard";

// This component is used to display the user's information
export default function UserInfo({
  username,
  email,
  genreIdArr,
  libraryLength,
  wishlistLength,
  friendsLength,
  image,
  clerkId,
  userId,
}) {
  // Create a ref to the container element
  const ref = useRef(null);

  // Create a state variable to store the maximum width of the container and the window width
  const [maxWidth, setMaxWidth] = useState(null);
  const [windowWidth, setWindowWidth] = useState(null);

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

  const size = windowWidth > 975 ? maxWidth - 500 : maxWidth - 72;

  return (
    <div
      ref={ref}
      className="bg shadow-search game-shadow rounded-[2px] flex bmd:justify-between p-[36px] bmd:items-start flex-col bmd:flex-row gap-[24px]"
    >
      <article className="flex items-center gap-[12px] bmd:gap-[32px] flex-col bmd:flex-row">
        <img
          src={image}
          alt={`${username}-profile-phote`}
          className="w-[250px] aspect-square object-cover rounded-full mx-auto"
        />
        <section className="flex flex-col items-center bmd:items-start">
          <h2
            style={{ maxWidth: `${size}px` }}
            className="text-[32px] tracking-[2.36px] text-center bmd:text-left bmd:text-[48px] w-full bmd:tracking-[2.88px] truncate uppercase font-bold translate-x-[-2px]"
          >
            {username}
          </h2>
          <h3 className="text-[12px] tracking-[0.72px] opacity-60 font-semibold translate-y-[-4px] uppercase">
            {email}
          </h3>
          <div className="flex gap-[10px] flex-wrap pt-[6px] pb-[10px]">
            {genreIdArr.map((genre) => {
              const title = genres.find((g) => g.genreId == genre).name;
              return (
                <Button
                  key={genre}
                  text={title}
                  variant={"tertiary"}
                  isLink={true}
                  href={`/search?genres=${genre}&title=${title}`}
                  attributes="text-[10px] tracking-[0.6px] px-[12px] py-[6px] w-max"
                />
              );
            })}
          </div>
          <UserCard
            libraryLength={libraryLength || 0}
            wishlistLength={wishlistLength || 0}
            friendsLength={friendsLength || 0}
          />
        </section>
      </article>
      {clerkId === userId && (
        <Button
          icon={"/edit-icon.png"}
          text="edit profile"
          isLink={true}
          buttonWidth={"w-full max-w-[260px] mx-auto bmd:mx-0 bmd:w-max"}
          href={"/onboarding/profile-setup"}
          attributes="text-[10px] tracking-[0.6px] px-[13px] py-[10px] font-semibold"
        />
      )}
    </div>
  );
}
