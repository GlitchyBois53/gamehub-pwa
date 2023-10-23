"use client";

import { useEffect, useState } from "react";

export default function Description({ description }) {
  const [paragraph, setParagraph] = useState(description);

  useEffect(() => {
    if (description.length > 500) {
      setParagraph(description.slice(0, 500) + "...\n\nSHOW MORE");
    }
  }, []);

  function handleClick() {
    if (description.length <= 500) return;
    if (paragraph === description + "\n\nSHOW LESS") {
      setParagraph(description.slice(0, 500) + "...\n\nSHOW MORE");
      return;
    }
    setParagraph(description + "\n\nSHOW LESS");
  }

  return (
    <section>
      <h2 className="font-bold tracking-[0.96px] uppercase">Description</h2>
      <p
        className={`text-[12px] font-medium tracking-[0.56px] opacity-60 pt-[12px] break-words whitespace-pre-line ${
          description.length > 500 && "cursor-pointer"
        }`}
        onClick={handleClick}
      >
        {paragraph}
      </p>
    </section>
  );
}
