"use client";

import { useStore } from "../../app/store";
import { useEffect } from "react";

// This component is used to set the head title for each page
export default function HeadTextProvider({ children, headText }) {
  const setHeadText = useStore((store) => store.setHeadTitle);

  useEffect(() => {
    setHeadText(headText);
  }, []);

  return <div>{children}</div>;
}
