import { currentUser } from "@clerk/nextjs";
import { fetchGameData } from "../../lib/fetchGameData.js";
import { fetchUser } from "../../lib/actions/user.actions.js";
import { redirect } from "next/navigation.js";
import Search from "../../components/shared/Search.jsx";
import GameCard from "../../components/shared/GameCard.jsx";

export default async function Home() {
  const searchLine = "Pokémon";

  // import userdata from clerk, to check whether the user is logged in or not
  const clerkUser = await currentUser();
  let dbUser = null;

  // if the user is logged in, check whether the user is onboarded or not
  if (clerkUser) {
    dbUser = await fetchUser(clerkUser.id);
    // if the user is not onboarded, redirect to the onboarding page
    if (!dbUser) {
      redirect("/onboarding/profile-setup");
    }
    if (dbUser?.onboarded === false) {
      redirect("/onboarding/profile-setup");
    }
  }

  const genreIdArr = dbUser?.genres.map((genre) => genre.genreId);

  let recommendedGames = null;

  if (genreIdArr && genreIdArr.length !== 0) {
    recommendedGames = await fetchGameData(
      "games",
      `
      fields name, rating, genres, total_rating, first_release_date, slug; 
      where genres = (${genreIdArr}) & version_parent = null & first_release_date != null & aggregated_rating_count > 5 & keywords != (2004, 2555) & category = (0, 10) & total_rating > 80; 
      limit 20; 
      sort total_rating desc;
      `
    );
  }

  return (
    <main>
      <Search />
      {dbUser &&
        dbUser.genres.length !== 0 &&
        Array.isArray(recommendedGames) && (
          <>
            {recommendedGames.map((game) => (
              <GameCard game={game} />
            ))}
          </>
        )}
    </main>
  );
}
