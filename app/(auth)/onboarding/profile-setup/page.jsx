import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "../../../../lib/actions/user.actions";
import OnboardingModal from "../../../../components/onboarding/OnboardingModal";
import ProfileForm from "../../../../components/onboarding/ProfileForm";

export default async function ProfileSetup() {
  const user = await currentUser();
  let dbUser = null;

  if (user) {
    dbUser = await fetchUser(user.id);
    console.log(dbUser);
  }

  return (
    <OnboardingModal
      title={"profile"}
      description={"Setup profile image and username:"}
      step={1}
    >
      <ProfileForm
        email={user.emailAddresses[0].emailAddress}
        username={dbUser.username || user.username || ""}
        image={dbUser.image || user.imageUrl}
        clerkId={user.id}
      />
    </OnboardingModal>
  );
}
