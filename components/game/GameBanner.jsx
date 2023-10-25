import { fetchGameData } from "../../lib/fetchGameData";
import { yearConverter } from "../../lib/yearConverter";
import Button from "../shared/Button";
import { genres, gameModes } from "../../constants";
import Rating from "./Rating";
import { currentUser } from "@clerk/nextjs";
import GameButtons from "./GameButtons";
import BackgroundImage from "./BackgroundImage";
import { fetchUser } from "../../lib/actions/user.actions";

export default async function GameBanner({
  game,
  screenshotArr,
  involvedCompanies,
}) {
  const clerkUser = await currentUser();
  let dbUser = null;

  if (clerkUser) {
    dbUser = await fetchUser(clerkUser.id);
  }

  const libraryIdArr = dbUser?.library.map((game) => game.gameId);
  const wishlistIdArr = dbUser?.wishlist.map((game) => game.gameId);

  const releaseYear = yearConverter(game?.first_release_date);

  const cover = await fetchGameData(
    "covers",
    `fields image_id; where id = ${game?.cover}; limit 1;`
  );

  const developer = involvedCompanies?.find((company) => company.developer);

  const companyId = developer?.company;
  const company = companyId
    ? await fetchGameData(
        "companies",
        `fields name, logo; where id = ${companyId}; limit 1;`
      )
    : null;

  const logoId = company?.[0]?.logo;
  const companyLogo = logoId
    ? await fetchGameData(
        "company_logos",
        `fields image_id; where id = ${logoId}; limit 1;`
      )
    : null;

  const genreIdArr = game?.genres?.map((genre) => genre);
  const gameModeArr = game?.game_modes?.map((gameMode) => gameMode);

  const criticRating = game?.aggregated_rating ?? null;
  const userRating = game?.rating ?? null;

  const criticRatingCount = game?.aggregated_rating_count ?? null;
  const userRatingCount = game?.rating_count ?? null;

  return (
    <section className="mt-[24px] bg shadow-search shadow-black/25 rounded-[2px] relative pt-[250px]">
      <BackgroundImage screenshotArr={screenshotArr} name={game?.name} />
      <article className="relative z-10 p-[32px]">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div className="flex items-end gap-[18px] flex-wrap">
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover[0]?.image_id}.png`}
              alt={`${game?.name}-cover`}
              className="h-[220px] w-[164.5px] object-cover shadow-search shadow-black/25 rounded-[2px]"
            />
            {companyLogo && (
              <div className="p-[6px] bg rounded-[2px] shadow-search shadow-black/20 relative">
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${companyLogo[0]?.image_id}.png`}
                  alt={`${game?.name}-cover`}
                  className="max-h-[56px] object-contain rounded-[2px] relative z-20 max-w-[100px]"
                />
              </div>
            )}
          </div>
          <p className="text-[20px] font-semibold tracking-[1.2px]">
            {releaseYear}
          </p>
        </div>
        <section className="flex justify-between items-end flex-wrap gap-y-[24px]">
          <div>
            <h1 className="tracking-[2.3px] font-bold text-[38px] py-[19px] uppercase md:max-w-[650px]">
              {game?.name}
            </h1>
            {/* TODO Add link to button to search page, when filtering is done :) */}
            <div className="flex gap-[12px] flex-wrap">
              {genreIdArr?.map((genre) => {
                const game = genres?.find(
                  (genreOb) => genreOb.genreId === genre
                );

                return (
                  <Button
                    text={game?.name ?? ""}
                    isLink={true}
                    href={`/search?genres=${game?.genreId}&title=${game?.name}`}
                    variant={"tertiary"}
                    attributes="px-[13px] py-[6px] text-[12px] tracking-[0.72px]"
                  />
                );
              })}
              {gameModeArr?.map((gameMode) => {
                const game = gameModes?.find(
                  (gameModeOb) => gameModeOb.id === gameMode
                );

                return (
                  <Button
                    text={game?.name ?? ""}
                    isLink={true}
                    href={`/search?modes=${game?.id}&title=${game?.name}`}
                    variant={"tertiary"}
                    attributes="px-[13px] py-[6px] text-[12px] tracking-[0.72px]"
                  />
                );
              })}
            </div>
            <GameButtons
              clerkId={clerkUser?.id}
              gameId={game?.id}
              libraryArr={libraryIdArr}
              wishlistArr={wishlistIdArr}
              clerkUser={clerkUser?.id}
            />
          </div>
          <div className="flex items-end justify-center md:mr-[-14px] flex-wrap mx-auto md:mx-0">
            <Rating rating={userRating} ratingCount={userRatingCount} />
            <Rating
              rating={criticRating}
              isBig={true}
              ratingCount={criticRatingCount}
            />
          </div>
        </section>
      </article>
    </section>
  );
}
