// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import Link from "next/link";

// This component is used to display a heading, it's used many times throughout the app.
export default function Heading({ text, image, username, clerkId }) {
  return (
    <>
      {username ? (
        <Link
          href={`/profile/${clerkId}`}
          className="cursor-pointer flex gap-[12px] items-center mb-[32px]"
        >
          <img
            src={image}
            alt={`${username}-profile-photo`}
            className="w-[36px] aspect-square rounded-full object-cover"
          />
          <h1 className="text-[32px] font-bold tracking-[1.92px] uppercase bg-game-grad bg-clip-text text-transparent w-max">
            {username}'s {text}
          </h1>
        </Link>
      ) : (
        <h1 className="text-[32px] font-bold tracking-[1.92px] uppercase bg-game-grad bg-clip-text text-transparent w-max mb-[32px]">
          {text}
        </h1>
      )}
    </>
  );
}
