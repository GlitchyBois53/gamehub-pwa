import { fetchGameData } from "../../lib/fetchGameData";
import { yearConverter } from "../../lib/yearConverter";
import Button from "../shared/Button";
import { genres, gameModes } from "../../constants";

export default async function GameBanner({ game, screenshot }) {
  const releaseYear = yearConverter(game?.first_release_date);

  const cover = await fetchGameData(
    "covers",
    `fields image_id; where id = ${game?.cover}; limit 1;`
  );

  const involvedCompanyId = game?.involved_companies?.[0];
  const involvedCompany = involvedCompanyId
    ? await fetchGameData(
        "involved_companies",
        `fields company; where id = ${involvedCompanyId}; limit 1;`
      )
    : null;

  const companyId = involvedCompany?.[0]?.company;
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

  const genreIdArr = game?.genres.map((genre) => genre);
  const gameModeArr = game?.game_modes.map((gameMode) => gameMode);

  const criticRating = game?.aggregated_rating;
  const userRating = game?.rating;

  return (
    <section className="mt-[24px] bg shadow-search shadow-black/25 rounded-[2px] relative pt-[250px]">
      <BackgroundImage image={screenshot.image_id} name={game?.name} />
      <article className="relative z-10 p-[32px]">
        <div className="flex justify-between items-end">
          <div className="flex items-end gap-[18px]">
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover[0].image_id}.png`}
              alt={`${game?.name}-cover`}
              className="h-[220px] w-[164.5px] object-cover shadow-search shadow-black/25 rounded-[2px]"
            />
            {companyLogo && (
              <div className="p-[6px] bg rounded-[2px] shadow-search shadow-black/20 relative">
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${companyLogo[0].image_id}.png`}
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
        <section className="flex justify-between items-end">
          <div>
            <h1 className="tracking-[2.3px] font-bold text-[38px] py-[19px] uppercase">
              {game?.name}
            </h1>
            <div className="flex gap-[12px]">
              {genreIdArr.map((genre) => {
                const game = genres.find(
                  (genreOb) => genreOb.genreId === genre
                );

                return (
                  <Button
                    text={game.name}
                    variant={"tertiary"}
                    attributes="px-[13px] py-[6px] text-[12px] tracking-[0.72px]"
                  />
                );
              })}
              {gameModeArr.map((gameMode) => {
                const game = gameModes.find(
                  (gameModeOb) => gameModeOb.id === gameMode
                );
                return (
                  <Button
                    text={game.name}
                    variant={"tertiary"}
                    attributes="px-[13px] py-[6px] text-[12px] tracking-[0.72px]"
                  />
                );
              })}
            </div>
            <div className="flex gap-[12px] mt-[24px]">
              <Button
                text="add to library"
                icon={"/library-icon-dark.svg"}
                attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px]"
              />
              <Button
                text="add to wishlist"
                icon={"/wishlist-icon-dark.png"}
                lightIcon={"/wishlist-icon.png"}
                variant={"secondary"}
                attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px]"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Rating rating={userRating} size={"118px"} />
            <Rating rating={criticRating} size={"156px"} />
          </div>
        </section>
      </article>
    </section>
  );
}

function BackgroundImage({ image, name }) {
  return (
    <div className="absolute top-0 left-0 right-0">
      <div className="overflow-hidden relative rounded-t-[2px]">
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_720p/${image}.png`}
          alt={`${name}-artwork`}
          className="w-full object-cover h-[415px] blur-[8px] scale-105"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </div>
  );
}

function Rating({ rating, size }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 110 110" style={{ width: size, height: size }}>
        <path
          strokeLinecap="round"
          strokeWidth="9"
          stroke="#F3F3F3"
          fill="none"
          strokeDasharray="251.2, 251.2"
          d="M55 15 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
        ></path>
        <path
          strokeLinecap="round"
          strokeWidth="9"
          stroke="#44D36C"
          fill="none"
          d="M55 15 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
          style={{
            strokeDasharray: `${(251.2 / 100) * rating || 0}px, 251.2px`,
            transition: "stroke-dasharray 3s ease 0s",
          }}
        ></path>
      </svg>
      <div className="absolute inset-0"></div>
    </div>
  );
}
