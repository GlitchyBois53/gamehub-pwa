import Link from "next/link";
import { featuredPlatforms } from "../../constants";

// This component is used to display the featured platforms
export default function FeaturedPlatforms() {
  return (
    <article className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mt-[32px]">
      {featuredPlatforms.map((platform) => (
        <Platform platform={platform} />
      ))}
    </article>
  );
}

// This component is used to display a platform
function Platform({ platform }) {
  return (
    <Link href={platform.href}>
      <div
        className="h-[195px] 2xl:h-[250px] rounded-[2px] flex justify-center items-center cursor-pointer shadow-search shadow-black/25"
        style={{
          background: `linear-gradient(180deg, ${platform.gradStart} 0%, ${platform.gradEnd} 100%)`,
        }}
      >
        <img
          className="h-[70px] object-contain max-w-[154px]"
          src={platform.icon}
          alt={platform.icon}
        />
      </div>
    </Link>
  );
}
