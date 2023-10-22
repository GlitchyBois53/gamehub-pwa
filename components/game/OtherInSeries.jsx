import { fetchGameData } from "../../lib/fetchGameData";
import GameContainer from "../shared/GameContainer";
import GameWrapper from "../game/GameWrapper";

export default async function OtherInSeries({ collectionId, gameId }) {
  const collection = await fetchGameData(
    "collections",
    `fields name, games; where id = (${collectionId});`
  );

  const collectionIdArr = collection?.[0]?.games.map((game) => game);

  const collectionGames = await fetchGameData(
    "games",
    `
    fields name, genres, total_rating, first_release_date, slug, cover;
    where id = (${collectionIdArr}) & id != ${gameId} & screenshots != null & involved_companies != null & version_parent = null & first_release_date != null & keywords != (2004, 2555) & category = (0, 10); 
    limit 20; 
    sort first_release_date desc;
    `
  );

  return (
    <>
      {collectionGames?.length > 0 && (
        <GameWrapper>
          <GameContainer
            arr={collectionGames}
            title={"Other in the series"}
            isScrollable={true}
            isOnGamePage={true}
          />
        </GameWrapper>
      )}
    </>
  );
}
