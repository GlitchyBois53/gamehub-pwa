// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client";

import { usePathname } from "next/navigation";
import { useStore } from "../../app/store";

// This component is used to display the head of the page
export default function Head() {
  const headText = useStore((store) => store.headTitle);
  const pathname = usePathname();
  const pathSplit = pathname.split("/");
  let path = pathSplit[1];

  if (pathSplit.length === 3) {
    path = headText || pathSplit[2];
  }
  return (
    <head>
      <title>
        {pathname === "/"
          ? "Home - GameHub"
          : pathname.includes("/games") && pathname !== "/games"
          ? `${path} - GameHub`
          : path[0].toUpperCase() + path.slice(1).toLowerCase() + " - GameHub"}
      </title>
      {/* TODO: add SEO if needed */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
    </head>
  );
}
