"use client";

import { AnimatePresence, motion as m } from "framer-motion";
import { useState } from "react";

export default function FullscreenScreenshot({
  screenshot,
  index,
  screenshotArr,
}) {
  // settign the active screenshot to the index of the screenshot
  const [activeScreenshot, setActiveScreenshot] = useState(index);

  // setting the state for the fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  // getting the length of the screenshot array
  const screenshotLength = screenshotArr.length;

  // function to handle the next screenshot
  function handleNext() {
    if (activeScreenshot === screenshotLength - 1) {
      setActiveScreenshot(0);
    } else {
      setActiveScreenshot(activeScreenshot + 1);
    }
  }

  // function to handle the previous screenshot
  function handlePrev() {
    if (activeScreenshot === 0) {
      setActiveScreenshot(screenshotLength - 1);
    } else {
      setActiveScreenshot(activeScreenshot - 1);
    }
  }
  return (
    <>
      <img
        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.png`}
        alt={`${screenshot.image_id}-screenshot`}
        className="rounded-[2px] max-w-none w-[462px] h-[260px] object-cover cursor-pointer"
        onClick={() => setIsFullscreen(!isFullscreen)}
      />
      <AnimatePresence>
        {isFullscreen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 md:left-[100px] bg-black/70 z-30 flex items-center justify-center"
              onClick={() => setIsFullscreen(false)}
            />
            <div className="fixed inset-0 md:left-[100px] flex items-center justify-center z-40 pointer-events-none">
              <m.div
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="pointer-events-auto flex gap-[24px] mx-[36px] items-center justify-center"
              >
                <img
                  src="/arrow-icon-dark.svg"
                  alt="prev-image"
                  className="w-[32px] rotate-90 cursor-pointer mr-[-70px] md:mr-0"
                  onClick={handlePrev}
                />
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_1080p/${screenshotArr[activeScreenshot].image_id}.png`}
                  alt={`${screenshot.image_id}-screenshot`}
                  className="rounded-[2px] w-full max-w-[1000px] aspect-video object-cover"
                />
                <img
                  src="/arrow-icon-dark.svg"
                  alt="next-image"
                  className="w-[32px] -rotate-90 cursor-pointer ml-[-70px] md:ml-0"
                  onClick={handleNext}
                />
              </m.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
