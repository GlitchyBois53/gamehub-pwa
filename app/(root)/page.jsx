import { currentUser } from "@clerk/nextjs";
import { fetchGameData } from "../../lib/fetchGameData.js";
import { fetchUser } from "../../lib/actions/user.actions.js";
import { redirect } from "next/navigation.js";
import Search from "../../components/shared/Search.jsx";
import GameContainer from "../../components/shared/GameContainer.jsx";

export default async function Home() {
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
      fields name, rating, genres, total_rating, first_release_date, slug, cover; 
      where genres = (${genreIdArr}) & version_parent = null & first_release_date != null & aggregated_rating_count > 5 & keywords != (2004, 2555) & category = (0, 10) & total_rating > 80; 
      limit 15; 
      sort total_rating desc;
      `
    );
  }

  const game = await fetchGameData(
    "games",
    `fields name, rating, genres, total_rating, first_release_date, slug, cover; where version_parent = null & rating_count > 50 & parent_game = null & aggregated_rating != null & aggregated_rating_count > 5; sort aggregated_rating desc; limit 10;`
  );

  return (
    <main>
      <Search />
      {dbUser && dbUser.genres.length !== 0 && (
        <GameContainer title={"Recommended for you"} arr={recommendedGames} />
      )}
      <GameContainer title={"Recommended for you"} arr={game} />
    </main>
  );
}
