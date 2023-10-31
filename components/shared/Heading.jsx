import Link from "next/link";

export default function Heading({ text, image, username, clerkId }) {
  return (
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
  );
}
