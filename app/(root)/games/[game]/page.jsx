import { fetchGameData } from "../../../../lib/fetchGameData";
import HeadTextProvider from "../../../../components/shared/HeadTextProvider.jsx";
import GameBanner from "../../../../components/game/GameBanner";
import Search from "../../../../components/shared/Search";
import GameDescription from "../../../../components/game/GameDescription";
import OtherInSeries from "../../../../components/game/OtherInSeries";

export default async function Game({ params }) {
  const gameFetch = await fetchGameData(
    "games",
    `fields *; where slug = "${params.game}"; limit 1;`
  );

  const game = gameFetch[0];

  const screenIdArr = game?.screenshots.map((screenshot) => screenshot);

  const screenshots = await fetchGameData(
    "screenshots",
    `fields image_id; where id = (${screenIdArr}); limit 100;`
  );

  // TODO Move to description Component
  const platformId = game?.platforms.map((platform) => platform);
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
    </HeadTextProvider>
  );
}
