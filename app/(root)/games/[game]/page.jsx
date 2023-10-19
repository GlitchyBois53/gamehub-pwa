import { SignedIn, SignedOut } from "@clerk/nextjs";
import { fetchGameData } from "../../../../lib/fetchGameData";
import { yearConverter } from "../../../../lib/yearConverter";
import HeadTextProvider from "../../../../components/shared/HeadTextProvider.jsx";
import GameBanner from "../../../../components/game/GameBanner";
import Search from "../../../../components/shared/Search";
import { getRandomIndex } from "../../../../lib/getRandomIndex";

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


  const randomScreenshot = getRandomIndex(screenshots);

  return (
    <HeadTextProvider headText={game?.name}>
      <Search />
      <GameBanner game={game} screenshot={screenshots[randomScreenshot]} />
    </HeadTextProvider>
  );
}
