import OnboardingModal from '../../../../components/onboarding/OnboardingModal'

export default function AppearanceSetup() {
    return (
        <OnboardingModal
        title={"appearance"}
        description={"Choose your preferred appearance:"}
        buttonText={"finish"}
        href={"/"}
        step={3}
      >
        <h1>Profile Setup</h1>
      </OnboardingModal>
    )
}