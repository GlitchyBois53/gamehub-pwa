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

export default async function Game({ params }) {
  const clerkUser = await currentUser();
  let dbUser = null;

  const gameFetch = await fetchGameData(
    "games",
    `fields *; where slug = "${params.game}"; limit 1;`
  );

  const game = gameFetch[0];

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

  const screenshots = await fetchGameData(
    "screenshots",
    `fields image_id; where id = (${screenIdArr}); limit 100;`
  );

  // TODO Move to description Component
  const platformId = game?.platforms?.map((platform) => platform);
  const platforms = platformId
    ? await fetchGameData(
        "platforms",
        `fields platform_logo, name; where id = (${platformId}); limit 100;`
      )
    : null;

  const involvedCompanyId = game?.involved_companies;
  const involvedCompany = involvedCompanyId
    ? await fetchGameData(
        "involved_companies",
        `fields company, developer, publisher; where id = (${involvedCompanyId});`
      )
    : null;
  
  const similarGameIds = game?.similar_games?.map((game) => game);

  return (
    <HeadTextProvider headText={game?.name}>
      <Search />
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
      {game?.collection && (
        <OtherInSeries collectionId={game?.collection} gameId={game?.id} />
      )}
      <SimilarGames gameIds={similarGameIds} />
      {clerkUser && (
        <RecentlyViewed recentArr={dbUser?.recentlyViewed} gameId={game?.id} />
      )}
    </HeadTextProvider>
  );
}
