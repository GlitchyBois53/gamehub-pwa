// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import { fetchUser } from "../../lib/actions/user.actions";
import NavLink from "./NavLink";

export default async function NavLinks({ clerkUser }) {
  let dbUser = null;

  if (clerkUser) {
    dbUser = await fetchUser(clerkUser?.id);
  }

  // setting the navigation links
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
    <>
      {navLinks.map((link) => (
        <NavLink
          activeIcon={link.activeIcon}
          href={link.href}
          icon={link.icon}
          iconDark={link.iconDark}
          name={link.name}
          key={link.name}
          hasRequest={dbUser?.receivedRequests?.length > 0}
        />
      ))}
    </>
  );
}
