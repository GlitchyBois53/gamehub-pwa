// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import { currentUser } from "@clerk/nextjs";
import OnboardingModal from "../../../../components/onboarding/OnboardingModal";
import ThemePicker from "../../../../components/onboarding/ThemePicker";

export default async function AppearanceSetup() {
  const clerkUser = await currentUser();

  return (
    <OnboardingModal
      title={"appearance"}
      description={"Choose your preferred appearance:"}
      step={3}
    >
      <ThemePicker clerkId={clerkUser?.id} />
    </OnboardingModal>
  );
}
