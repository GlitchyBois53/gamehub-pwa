import { currentUser } from "@clerk/nextjs";
import { fetchGameData } from "../../lib/fetchGameData.js";
import { fetchUser } from "../../lib/actions/user.actions.js";
import { redirect } from "next/navigation.js";
import Search from "../../components/shared/Search.jsx";
import GameContainer from "../../components/shared/GameContainer.jsx";
import WelcomeWrapper from "../../components/shared/WelcomeWrapper.jsx";
import { genres } from "../../constants/index.js";
import { getRandomIndex } from "../../lib/getRandomIndex.js";
import {
  alphabet,
  igdbSortMethods,
  igdbSortOrders,
} from "../../constants/index.js";
import ImageSliderContainer from "../../components/home/ImageSliderContainer.jsx";

export default async function Home() {
  // import userdata from clerk, to check whether the user is logged in or not
  const clerkUser = await currentUser();
  let dbUser = null;
  const defaultGenres = ["5", "12", "31"];

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
  const genreChoices = genreIdArr || defaultGenres;

  let recommendedGames = null;

  // if the user has selected genres, fetch the recommended games
  if (genreIdArr && genreIdArr.length !== 0) {
    // setting the random letter and sort method for the recommended games
    const randomLetterIndex = getRandomIndex(alphabet);
    const randomSortMethodIndex = getRandomIndex(igdbSortMethods);
    const randomSortMethodOrder = getRandomIndex(igdbSortOrders);
    // fetching the recommended games
    recommendedGames = await fetchGameData(
      "games",
      `
      fields name, genres, total_rating, first_release_date, slug, cover; 
      where genres = (${genreIdArr}) & name ~*"${alphabet[randomLetterIndex]}"* & version_parent = null & first_release_date != null & aggregated_rating_count > 5 & keywords != (2004, 2555) & category = (0, 8, 9, 10) & total_rating > 80; 
      limit 20; 
      sort ${igdbSortMethods[randomSortMethodIndex]} ${igdbSortOrders[randomSortMethodOrder]};
      `
    );
  }

  // setting the random letter and sort method for the hero games
  const randomLetterIndex = getRandomIndex(alphabet);
  const randomSortMethodIndex = getRandomIndex(igdbSortMethods);
  const randomSortMethodOrder = getRandomIndex(igdbSortOrders);

  // fetching the hero games
  const heroGames = await fetchGameData(
    "games",
    `
    fields screenshots, name, cover, total_rating, involved_companies, slug;
    where screenshots != null & involved_companies != null & name ~*"${alphabet[randomLetterIndex]}"* & version_parent = null & first_release_date != null & aggregated_rating_count > 5 & keywords != (2004, 2555) & category = (0, 8, 9, 10) & total_rating > 80; 
    limit 4; 
    sort ${igdbSortMethods[randomSortMethodIndex]} ${igdbSortOrders[randomSortMethodOrder]};
    `
  );

  return (
    <WelcomeWrapper
      clerkUser={clerkUser ? true : false}
      username={dbUser?.username}
    >
      <main>
        <Search />
        <ImageSliderContainer games={heroGames} />
        <div className="flex flex-col gap-[12px] mt-[72px]">
          {dbUser && dbUser.genres.length !== 0 && (
            <GameContainer
              title={"Recommended for you"}
              arr={recommendedGames}
              isScrollable={true}
            />
          )}
          {dbUser && dbUser.recentlyViewed.length !== 0 && (
            <GameContainer
              // reverse the array to show the most recent games first
              arr={dbUser?.recentlyViewed.reverse()}
              isScrollable={true}
              title={"Recently Viewed"}
            />
          )}
          {genreChoices.map(async (genre) => {
            // setting the random letter and sort method for the genre games
            const randomLetterIndex = getRandomIndex(alphabet);
            const randomSortMethodIndex = getRandomIndex(igdbSortMethods);
            const randomSortMethodOrder = getRandomIndex(igdbSortOrders);

            // fetching the genre games
            const genreData = await fetchGameData(
              "games",
              `
            fields name, genres, total_rating, first_release_date, slug, cover; 
            where genres = (${genre}) & name ~*"${alphabet[randomLetterIndex]}"* & version_parent = null & first_release_date != null & aggregated_rating_count > 5 & keywords != (2004, 2555) & category = (0, 8, 9, 10) & total_rating > 80; 
            limit 20; 
            sort ${igdbSortMethods[randomSortMethodIndex]} ${igdbSortOrders[randomSortMethodOrder]};
            `
            );
            const title = genres.find(
              (genreArr) => genreArr.genreId == genre
            ).name;

            return (
              <GameContainer
                arr={genreData}
                title={title}
                isScrollable={true}
                key={genre}
                isLink={true}
                href={`/search/?genres=${genre}&title=${title}`}
              />
            );
          })}
        </div>
      </main>
    </WelcomeWrapper>
  );
}
