import { currentUser } from "@clerk/nextjs";
import OnboardingModal from "../../../../components/onboarding/OnboardingModal";
import GenrePicker from "../../../../components/onboarding/GenrePicker";
import { fetchUser } from "../../../../lib/actions/user.actions";

export default async function GenreSetup() {
  const clerkUser = await currentUser();
  let dbUser = null;
  let genres = [];

  if (clerkUser) {
    dbUser = await fetchUser(clerkUser.id);
    if (dbUser) {
      genres = dbUser?.genres.map((genre) => ({
        genreId: genre.genreId,
        name: genre.name,
      }));
      console.log(genres);
    }
  }

  return (
    <OnboardingModal
      title={"Genre"}
      description={"Choose 1-3 of your favorite genres:"}
      step={2}
    >
      <GenrePicker clerkId={clerkUser.id} genreArr={genres} />
    </OnboardingModal>
  );
}
