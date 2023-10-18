"use client";

import { useStore } from "../../app/store";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children, font }) {
  let themeMatch = null;

  // setting the theme based on the user's system preferences
  if (typeof window !== "undefined") {
    themeMatch = window.matchMedia("(prefers-color-scheme: light)");
  }

  // importing the theme from the store
  const [theme, setTheme] = useStore(
    (store) => [store.theme, store.setTheme],
    shallow
  );

  const [isClient, setIsClient] = useState(false);

  // setting the theme based on either the user's system preferences or the user's preference
  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      setTheme(themeMatch.matches ? "light" : "dark");
    } else {
      if (localStorage.getItem("theme") === "light") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div
          className={`${
            theme === "light"
              ? "bg-back-light text-txt-light"
              : "bg-back-dark text-white dark"
          } ${font} md:min-h-screen min-h-mobile transition-colors`}
        >
          {children}
        </div>
      )}
    </>
  );
}
