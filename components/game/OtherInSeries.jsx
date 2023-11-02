// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import { fetchGameData } from "../../lib/fetchGameData";
import GameContainer from "../shared/GameContainer";
import GameWrapper from "../game/GameWrapper";

export default async function OtherInSeries({ collectionId, gameId }) {
  // fetching the collection data
  const collection = await fetchGameData(
    "collections",
    `fields name, games; where id = (${collectionId});`
  );
  
  const collectionIdArr = collection?.[0]?.games.map((game) => game);

  // fetching the games in the collection that are not the current game
  const collectionGames = await fetchGameData(
    "games",
    `
    fields name, genres, total_rating, first_release_date, slug, cover;
    where id = (${collectionIdArr}) & id != ${gameId} & screenshots != null & involved_companies != null & version_parent = null & first_release_date != null & keywords != (2004, 24124, 25522, 33402, 1603, 4472) & category = (0, 8, 9, 10); 
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
