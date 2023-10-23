import GameWrapper from "../game/GameWrapper";
import GameContainer from "./GameContainer";

export default async function RecentlyViewed({ recentArr, gameId }) {
  const recentArrWithoutCurrent = recentArr.filter((game) => game.id != gameId);

  return (
    <>
      {recentArrWithoutCurrent.length > 0 && (
        <GameWrapper>
          <GameContainer
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
