import OnboardingModal from "../../../../components/onboarding/OnboardingModal";

export default function GenreSetup() {
  return (
    <OnboardingModal
      title={"Genre"}
      description={"Choose 3-10 of your favorite genres:"}
      buttonText={"next"}
      href={"/onboarding/appearance"}
      step={2}
    >
      <h1>Genre Setup</h1>
    </OnboardingModal>
  );
}