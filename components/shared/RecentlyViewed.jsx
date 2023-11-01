import GameWrapper from "../game/GameWrapper";
import GameContainer from "./GameContainer";

export default async function RecentlyViewed({ recentArr, gameId }) {
  // filtering out the current game from the recently viewed list
  const recentArrWithoutCurrent = recentArr.filter((game) => game.id != gameId);

  return (
    <>
      {recentArrWithoutCurrent.length > 0 && (
        <GameWrapper>
          <GameContainer
            // reversing the array so the most recent game is first
            arr={recentArrWithoutCurrent.reverse()}
            isOnGamePage={true}
            isScrollable={true}
            title={"Recently Viewed"}
          />
        </GameWrapper>
      )}
    </>
  );
}
