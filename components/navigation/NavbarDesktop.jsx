// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import ThemeSwitcher from '../shared/ThemeSwitcher';
import { currentUser, SignedIn, SignedOut, useClerk } from '@clerk/nextjs';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Button from '../shared/Button';
import ProfileButton from './ProfileButton';
import { fetchUser } from '../../lib/actions/user.actions';

export default async function NavbarDesktop() {
  // import userdata from clerk, to check whether the user is logged in or not
  const clerkUser = await currentUser();
  let dbUser = null;

  if (clerkUser) {
    dbUser = await fetchUser(clerkUser.id);
  }

  return (
    <aside className="hidden md:flex flex-col justify-between items-center w-[100px] fixed h-[100svh] shadow-nav shadow-black/50 transition-shadow py-[24px] px-[10px] z-30">
      <div>
        <Logo />
        <nav className="flex flex-col gap-[32px] items-center">
          <NavLinks clerkUser={clerkUser} />
        </nav>
      </div>
      <div className="flex flex-col items-center gap-[32px]">
        <ThemeSwitcher />
        <SignedOut>
          <Button
            icon={'/login-icon.svg'}
            text={'Login'}
            attributes="text-[10px] px-[10.5px] py-[8px] tracking-[0.7px]"
            isLink={true}
            href={'/sign-in'}
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
