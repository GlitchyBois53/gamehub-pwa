"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hr from "../shared/Hr";
import { AnimatePresence, motion as m } from "framer-motion";
import { useStore } from "../../app/store";
import { shallow } from "zustand/shallow";

export default function More({ isFriend, handleClick, slug, isWhite }) {
  const theme = useStore((store) => store.theme);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [activeMore, setActiveMore] = useStore(
    (store) => [store.activeMore, store.setActiveMore],
    shallow
  );

  function handleToggle() {
    if (isOptionsOpen) {
      setActiveMore("");
    } else {
      setActiveMore(slug);
    }
    setIsOptionsOpen(!isOptionsOpen);
  }

  useEffect(() => {
    if (activeMore !== slug) setIsOptionsOpen(false);
  }, [activeMore]);

  return (
    <>
      <div className="relative h-full flex items-center ">
        <div
          className={`${
            isWhite ? "h-full w-full" : "h-1/2"
          } cursor-pointer flex items-center`}
          onClick={handleToggle}
        >
          <img
            src={
              isWhite
                ? "/more-icon-dark.png"
                : theme === "light"
                ? "/more-icon.png"
                : "/more-icon-dark.png"
            }
            className={`${
              isWhite ? "w-[16px] h-[2px]" : "w-[18px]"
            } object-contain`}
          />
        </div>
        <AnimatePresence>
          {isOptionsOpen && activeMore === slug && (
            <Options
              isFriend={isFriend}
              handleClick={handleClick}
              slug={slug}
              setIsOptionsOpen={setIsOptionsOpen}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function Options({ isFriend, handleClick, slug, setIsOptionsOpen }) {
  return (
    <m.article
      initial={{ opacity: 0, y: -10, scale: 0, transformOrigin: "top right" }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="absolute top-[24px] right-0 bg game-shadow py-[2px] flex flex-col items-center gap-[2px]"
      onClick={() => setIsOptionsOpen(false)}
    >
      {isFriend ? (
        <>
          <Option
            text={"View Profile"}
            href={`/profile/${slug}`}
            isLink={true}
          />
          <Hr />
          <Option
            isLink={true}
            href={`/library/${slug}`}
            text={"View Library"}
          />
          <Hr />
          <Option
            handleClick={handleClick}
            text={"Remove Friend"}
            color={"text-[#FF4040]"}
          />
        </>
      ) : (
        <>
          <Option text={"View Game"} isLink={true} href={`/games/${slug}`} />
          <Hr />
          <Option
            handleClick={handleClick}
            text={"Remove Game"}
            color={"text-[#FF4040]"}
          />
        </>
      )}
    </m.article>
  );
}

function Option({ isLink, href, handleClick, text, color }) {
  return (
    <>
      {isLink ? (
        <Link href={href} className={`block ${color || ""}`}>
          <OptionBody text={text} />
        </Link>
      ) : (
        <button onClick={handleClick} className={`block ${color || ""}`}>
          <OptionBody text={text} />
        </button>
      )}
    </>
  );
}

function OptionBody({ text }) {
  return (
    <p className="text-[12px] tracking-[0.72px] text-center uppercase font-medium py-[8px] px-[16px] w-max">
      {text}
    </p>
  );
}
