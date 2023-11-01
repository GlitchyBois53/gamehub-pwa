// Import necessary dependencies
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

// Define the HeroCard component
export default function HeroCard({ screenshot, cover, rating, name, slug }) {
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

  // Calculate the formatted rating for the game
  const formattedRating = rating / 10;

  
  // Render the HeroCard component
  return (
    <Link href={`/games/${slug}`}>
      <div
        ref={ref}
        className="md:h-[402px] h-[300px] 2xl:h-[600px] w-full relative overflow-hidden rounded-[2px]"
      >
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_720p/${screenshot.image_id}.png`}
          alt=""
          className="w-full h-full object-cover blur-[4px] scale-105"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col md:flex-row justify-between items-center md:justify-start md:items-end md:p-[54px] p-[24px]">
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.png`}
            alt=""
            className="md:h-[294px] md:w-[220px] h-[147px] w-[110px] object-cover rounded-[2px]"
          />
          <article
            className="w-full md:translate-y-[17px]"
            style={{
              maxWidth: `${maxWidth - (windowWidth >= 768 ? 328 : 24)}px`,
            }}
          >
            <div className="md:ml-[30px] bg max-w-[52px] h-[28px] flex justify-center items-center gap-[4px] rounded-[2px] translate-y-[12px]">
              <p className="font-semibold tracking-[0.96px] translate-y-[-1px]">
                {formattedRating.toFixed(1)}
              </p>
              <img
                src="/star-icon.png"
                alt="star-icon"
                className="w-[9.5px] object-contain aspect-square"
              />
            </div>
            <h2 className="md:text-[52px] text-[24px] tracking-[1.44px] p-[12px] md:translate-x-0 md:translate-y-0 translate-x-[-12px] translate-y-[12px] md:pl-[30px] font-bold md:tracking-[3.12px] w-full uppercase truncate text-back-light text-shadow">
              {name}
            </h2>
          </article>
        </div>
      </div>
    </Link>
  );
}
