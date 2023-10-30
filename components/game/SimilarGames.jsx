import { fetchGameData } from "../../lib/fetchGameData";
import GameContainer from "../shared/GameContainer";
import GameWrapper from "../game/GameWrapper";

export default async function SimilarGames({ gameIds }) {
  const similarGames = await fetchGameData(
    "games",
    `
    fields name, genres, total_rating, first_release_date, slug, cover;
    where id = (${gameIds}) & screenshots != null & involved_companies != null & version_parent = null & first_release_date != null & keywords != (2004, 2555) & category = (0, 8, 9, 10); 
    limit 20; 
    sort first_release_date desc;
    `
  );

  return (
    <GameWrapper>
      <GameContainer
        arr={similarGames}
        title={"Recommended"}
        isScrollable={true}
        isOnGamePage={true}
      />
    </GameWrapper>
  );
}
