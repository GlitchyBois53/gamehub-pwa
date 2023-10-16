import ThemeSwitcher from '../shared/ThemeSwitcher';
import { currentUser } from '@clerk/nextjs';
import NavLink from './NavLink';

export default async function NavbarDesktop() {
  // import userdata from clerk, to check whether the user is logged in or not
  const clerkUser = await currentUser();

  // array of objects containing the data for each link
  const navLinks = [
    {
      activeIcon: '/home-icon-grad.png',
      href: '/',
      icon: '/home-icon.png',
      iconDark: '/home-icon-dark.png',
      name: 'home',
    },
    {
      activeIcon: '/games-icon-grad.png',
      href: '/games',
      icon: '/games-icon.png',
      iconDark: '/games-icon-dark.png',
      name: 'games',
    },
    {
      activeIcon: '/friends-icon-grad.png',
      href: '/friends',
      icon: '/friends-icon.png',
      iconDark: '/friends-icon-dark.png',
      name: 'friends',
    },
    {
      activeIcon: '/library-icon-grad.png',
      // setting the link based on whether the user is logged in or not
      href: `/library/${clerkUser ? clerkUser.id : 'nouser'}`,
      icon: '/library-icon.png',
      iconDark: '/library-icon-dark.png',
      name: 'library',
    },
  ];

  return (
    <aside className="w-[100px] fixed h-[100svh] xl-shadow transition-shadow">
      <nav>
        {navLinks.map((link) => (
          <NavLink
            activeIcon={link.activeIcon}
            href={link.href}
            icon={link.icon}
            iconDark={link.iconDark}
            name={link.name}
          />
        ))}
      </nav>
      <ThemeSwitcher />
    </aside>
  );
}
