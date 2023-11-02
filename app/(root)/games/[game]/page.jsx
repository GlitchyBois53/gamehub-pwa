import { fetchGameData } from "../../../../lib/fetchGameData";
import HeadTextProvider from "../../../../components/shared/HeadTextProvider.jsx";
import GameBanner from "../../../../components/game/GameBanner";
import Search from "../../../../components/shared/Search";
import GameDescription from "../../../../components/game/GameDescription";
import OtherInSeries from "../../../../components/game/OtherInSeries";
import SimilarGames from "../../../../components/game/SimilarGames";
import {
  fetchUser,
  setRecentlyViewed,
} from "../../../../lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import RecentlyViewed from "../../../../components/shared/RecentlyViewed";
import GameContainer from "../../../../components/shared/GameContainer";
import GameWrapper from "../../../../components/game/GameWrapper";

export default async function Game({ params }) {
  const clerkUser = await currentUser();
  let dbUser = null;

  // Fetching the game data based on the slug in the url
  const gameFetch = await fetchGameData(
    "games",
    `fields *; where slug = "${params.game}"; limit 1;`
  );

  const game = gameFetch[0];

  // If the user is logged in, add the game to their recently viewed list
  if (clerkUser) {
    await setRecentlyViewed({
      clerkId: clerkUser?.id,
      gameArr: {
        id: game?.id,
        name: game?.name,
        cover: game?.cover,
        slug: game?.slug,
        first_release_date: game?.first_release_date,
        genres: game?.genres,
        total_rating: game?.total_rating,
      },
    });
    dbUser = await fetchUser(clerkUser?.id);
  }

  const screenIdArr = game?.screenshots?.map((screenshot) => screenshot);

  // Fetching the screenshots for the game
  const screenshots = await fetchGameData(
    "screenshots",
    `fields image_id; where id = (${screenIdArr}); limit 100;`
  );

  // fetching the platforms for the game
  const platformId = game?.platforms?.map((platform) => platform);
  const platforms = platformId
    ? await fetchGameData(
        "platforms",
        `fields platform_logo, name; where id = (${platformId}); limit 100;`
      )
    : null;

  // Fetching the involved companies for the game
  const involvedCompanyId = game?.involved_companies;
  const involvedCompany = involvedCompanyId
    ? await fetchGameData(
        "involved_companies",
        `fields company, developer, publisher; where id = (${involvedCompanyId});`
      )
    : null;

  // Fetching the developer for the game
  const developer = involvedCompany?.find((company) => company.developer);

  // Fetching the gameIds of games developed by the developer
  const developerObj = await fetchGameData(
    "companies",
    `fields *; where id = ${developer?.company}; limit 1;`
  );

  // Fetching the games developed by the developer
  const developedGames = await fetchGameData(
    "games",
    `
    fields name, genres, total_rating, first_release_date, slug, cover; 
    where id = (${developerObj?.[0]?.developed}) & id != ${game?.id} & parent_game = null & version_parent = null & category = (0, 8, 9, 10); 
    limit 20;
    sort first_release_date desc;
    `
  );

  console.log(developer);

  // Fetching the dlcs for the game
  const dlcs = await fetchGameData(
    "games",
    `
    fields name, genres, total_rating, first_release_date, slug, cover;
    where id = (${game?.expansions});
    limit 20;
    sort first_release_date desc;
    `
  );

  // Making an array of the gameIds of the similar games
  const similarGameIds = game?.similar_games?.map((game) => game);

  return (
    <HeadTextProvider headText={game?.name}>
      <Search isOnGamePage={true} />
      <GameBanner
        game={game}
        screenshotArr={screenshots}
        involvedCompanies={involvedCompany}
      />
      <GameDescription
        game={game}
        screenshots={screenshots}
        involvedCompanies={involvedCompany}
        platforms={platforms}
      />
      {game?.expansions && (
        <GameWrapper>
          <GameContainer
            arr={dlcs}
            title={`Expansions for ${game?.name}`}
            isScrollable={true}
            isOnGamePage={true}
          />
        </GameWrapper>
      )}
      {game?.collection && (
        <OtherInSeries collectionId={game?.collection} gameId={game?.id} />
      )}
      {developer && developedGames.length !== 0 && (
        <GameWrapper>
          <GameContainer
            arr={developedGames}
            title={`Other games by ${developerObj?.[0]?.name}`}
            isScrollable={true}
            isOnGamePage={true}
          />
        </GameWrapper>
      )}
      <SimilarGames gameIds={similarGameIds} />
      {clerkUser && (
        <RecentlyViewed recentArr={dbUser?.recentlyViewed} gameId={game?.id} />
      )}
    </HeadTextProvider>
  );
}
