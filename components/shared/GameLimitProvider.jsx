"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useStore } from "../../app/store";

export default function GameLimitProvider({ children }) {
  // Create a state variable to store the maximum width of the container and the window width
  const [windowWidth, setWindowWidth] = useState(0);
  const [maxPerLine, setMaxPerLine] = useState(0);
  const [maxPerPage, setMaxPerPage] = useState(0);
  const [maxRows, setMaxRows] = useState(6);
  const setLimit = useStore((state) => state.setLimit);

  const detract = windowWidth < 768 ? 0 : 100;

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
      setWindowWidth(window.innerWidth);
    }, 100),
    []
  );

  // Set the initial maximum width of the container
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // Add a resize event listener to the window
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Remove the resize event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    setMaxPerLine((windowWidth - detract - 24) / 184);
    setMaxPerPage(Math.floor(maxPerLine) * maxRows);
  }, [windowWidth]);

  useEffect(() => {
    setMaxPerLine((windowWidth - detract - 24) / 184);
  }, []);

  useEffect(() => {
    if (maxPerLine) {
      setMaxPerPage(Math.floor(maxPerLine) * maxRows);
      if (windowWidth < 768) {
        setMaxRows(6);
      } else {
        setMaxRows(3);
      }
    }
  }),
    [maxPerLine];

  useEffect(() => {
    setLimit(maxPerPage);
  }, [maxPerPage]);

  return <div>{children}</div>;
}
