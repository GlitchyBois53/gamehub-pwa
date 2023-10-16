import { currentUser, SignedIn, SignedOut } from "@clerk/nextjs";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import ThemeSwitcher from "../shared/ThemeSwitcher";
import { fetchUser } from "../../lib/actions/user.actions";
import Button from "../shared/Button";

export default async function NavbarMobile() {
  const clerkUser = await currentUser();
  let dbUser = null;

  if (clerkUser) {
    dbUser = await fetchUser(clerkUser.id);
  }

  return (
    <div className="fixed inset-0 flex flex-col justify-between md:hidden">
      <Top
        image={dbUser?.image}
        clerkId={dbUser?.clerkId}
        email={dbUser?.email}
        username={dbUser?.username}
      />
      <Bottom clerkUser={clerkUser} />
    </div>
  );
}

function Top({ image, clerkId, email, username }) {
  return (
    <div className="grid grid-cols-3 justify-between items-center py-[24px] px-[32px] shadow-nav bg shadow-black/25">
      <SignedIn>
        <ProfileButton
          avatar={image}
          clerkId={clerkId}
          email={email}
          username={username}
        />
      </SignedIn>

      <SignedOut>
        <Button
          icon={"/login-icon.svg"}
          text={"Login"}
          attributes="text-[10px] px-[10.5px] py-[8px] tracking-[0.7px] w-max"
          isLink={true}
          href={"/sign-in"}
        />
      </SignedOut>

      <Logo />

      <ThemeSwitcher />
    </div>
  );
}

function Bottom({ clerkUser }) {
  return (
    <div className="flex justify-between items-center py-[24px] px-[32px] shadow-nav bg shadow-black/25">
      <NavLinks clerkUser={clerkUser} />
    </div>
  );
}
