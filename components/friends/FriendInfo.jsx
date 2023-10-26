import Link from "next/link";
import Vr from "../shared/Vr";

export default function FriendInfo({ id, image, username, email }) {
  return (
    <Link
      href={`/profile/${id}`}
      className="flex gap-[10px] h-full items-center"
    >
      <img
        src={image}
        alt={`${username}-profile-pic`}
        className="w-[46px] rounded-full object-cover aspect-square"
      />
      <Vr />
      <article>
        <h3 className="tracking-[0.96px] font-bold uppercase bg-game-grad bg-clip-text text-transparent">
          {username}
        </h3>
        <h4 className="tracking-[0.72px] text-xs font-medium opacity-50">
          {email}
        </h4>
      </article>
    </Link>
  );
}
