import ThemeSwitcher from "../shared/ThemeSwitcher";
import { currentUser, SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import NavLink from "./NavLink";
import Logo from "./Logo";
import Button from "../shared/Button";
import ProfileButton from "./ProfileButton";
import { fetchUser } from "../../lib/actions/user.actions";

export default async function NavbarDesktop() {
  // import userdata from clerk, to check whether the user is logged in or not
  const clerkUser = await currentUser();
  let dbUser = null;

  if (clerkUser) {
    dbUser = await fetchUser(clerkUser.id);
    console.log(dbUser);
  }

  // array of objects containing the data for each link
  const navLinks = [
    {
      activeIcon: "/home-icon-grad.png",
      href: "/",
      icon: "/home-icon.png",
      iconDark: "/home-icon-dark.png",
      name: "home",
    },
    {
      activeIcon: "/games-icon-grad.png",
      href: "/games",
      icon: "/games-icon.png",
      iconDark: "/games-icon-dark.png",
      name: "games",
    },
    {
      activeIcon: "/friends-icon-grad.png",
      href: "/friends",
      icon: "/friends-icon.png",
      iconDark: "/friends-icon-dark.png",
      name: "friends",
    },
    {
      activeIcon: "/library-icon-grad.png",
      // setting the link based on whether the user is logged in or not
      href: `/library/${clerkUser ? clerkUser.id : "nouser"}`,
      icon: "/library-icon.png",
      iconDark: "/library-icon-dark.png",
      name: "library",
    },
  ];

  return (
    <aside className="flex flex-col justify-between items-center w-[100px] fixed h-[100svh] shadow-nav shadow-black/50 transition-shadow py-[24px] px-[10px] z-30">
      <div>
        <Logo />
        <nav className="flex flex-col gap-[32px] items-center">
          {navLinks.map((link) => (
            <NavLink
              activeIcon={link.activeIcon}
              href={link.href}
              icon={link.icon}
              iconDark={link.iconDark}
              name={link.name}
              key={link.name}
            />
          ))}
        </nav>
      </div>
      <div className="flex flex-col items-center gap-[32px]">
        <ThemeSwitcher />
        <SignedOut>
          <Button
            icon={"/login-icon.svg"}
            text={"Login"}
            attributes="text-[10px] px-[10.5px] py-[8px] tracking-[0.7px]"
            isLink={true}
            href={"/sign-in"}
          />
        </SignedOut>
        <SignedIn>
          <ProfileButton
            username={dbUser?.username}
            email={dbUser?.email}
            avatar={dbUser?.image}
            clerkId={dbUser?.clerkId}
          />
        </SignedIn>
      </div>
    </aside>
  );
}
