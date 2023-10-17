import GameCard from "./GameCard";

export default function GameContainer({ arr, title }) {
  return (
    <>
      <h2 className="text-[24px] uppercase tracking-[1.44px] font-bold bg-game-grad bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="flex overflow-scroll gap-[24px] md:ml-[-32px] mx-[-24px] md:pl-[32px] p-[24px]">
        {Array.isArray(arr) && (
          <>
            {arr.map((game) => (
              <GameCard game={game} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
