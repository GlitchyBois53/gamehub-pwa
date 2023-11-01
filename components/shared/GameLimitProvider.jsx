"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";

export default function GameLimitProvider({ children, searchParams }) {
  const pathname = usePathname();
  const router = useRouter();

  // Create a ref to the container element
  const ref = useRef(null);

  // Create a state variable to store the maximum width of the container and the window width
  const [maxWidth, setMaxWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [maxPerLine, setMaxPerLine] = useState(0);
  const [maxPerPage, setMaxPerPage] = useState(0);
  const [maxRows, setMaxRows] = useState(6);

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
    // Check if the pathname already includes the limit parameter before pushing a new route
    if (maxPerPage && !pathname.includes("limit")) {
      router.push(pathname + "?" + createQueryString("limit", maxPerPage));
    }
    // Remove the resize event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    setMaxPerLine((maxWidth + 24) / 184);
    setMaxPerPage(Math.floor(maxPerLine) * maxRows);
    // Check if the pathname already includes the limit parameter before pushing a new route
    if (maxPerPage && !pathname.includes("limit")) {
      router.push(pathname + "?" + createQueryString("limit", maxPerPage));
    }
  }, [maxWidth]);

  useEffect(() => {
    if (maxPerLine) {
      setMaxPerPage(Math.floor(maxPerLine) * maxRows);
      // Check if the pathname already includes the limit parameter before pushing a new route
      if (!pathname.includes("limit")) {
        router.push(pathname + "?" + createQueryString("limit", maxPerPage));
      }
      if (windowWidth < 768) {
        setMaxRows(6);
      } else {
        setMaxRows(3);
      }
    }
  }),
    [maxPerLine];
  useEffect(() => {
    setMaxPerLine((maxWidth + 24) / 184);
  }, []);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div ref={ref} className="h-full">
      {children}
    </div>
  );
}
