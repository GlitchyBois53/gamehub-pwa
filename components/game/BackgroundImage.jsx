"use client";

import { useEffect, useState } from "react";
import { getRandomIndex } from "../../lib/getRandomIndex";

// This component is used to display the background image for the game page
export default function BackgroundImage({ screenshotArr, name }) {
  const [screenshot, setScreenshot] = useState(null);

  // setting the background image to a random screenshot from the game, on the first render of the component
  useEffect(() => {
    setScreenshot(getRandomIndex(screenshotArr));
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0">
      <div className="overflow-hidden relative rounded-t-[2px]">
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_720p/${
            screenshotArr[screenshot || 0]?.image_id
          }.png`}
          alt={screenshot ? `${name}-artwork` : ""}
          className="w-full object-cover h-[415px] blur-[8px] scale-105"
        />

        <div className="absolute inset-0 bg-black/10" />
      </div>
    </div>
  );
}
