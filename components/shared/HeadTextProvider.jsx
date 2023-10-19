"use client";

import { useStore } from "../../app/store";
import { useEffect } from "react";

export default function HeadTextProvider({ children, headText }) {
  const setHeadText = useStore((store) => store.setHeadTitle);

  useEffect(() => {
    setHeadText(headText);
  }, []);

  return <div>{children}</div>;
}
