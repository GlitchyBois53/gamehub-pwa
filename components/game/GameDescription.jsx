import { fetchGameData } from "../../lib/fetchGameData";
import Hr from "../shared/Hr";
import { timeConverter } from "../../lib/timeConverter";
import Description from "./Description";

export default async function GameDescription({
  game,
  screenshots,
  involvedCompanies,
  platforms,
}) {
  const developerId = involvedCompanies?.find(
    (company) => company.developer
  )?.company;
  const publisherId = involvedCompanies?.find(
    (company) => company.publisher
  )?.company;

  const developer = await fetchGameData(
    "companies",
    `fields name; where id = ${developerId}; limit 1;`
  );

  const publisher = await fetchGameData(
    "companies",
    `fields name; where id = ${publisherId}; limit 1;`
  );

  const videos = await fetchGameData(
    "game_videos",
    `fields video_id; where game = ${game?.id}; limit 100;`
  );

  return (
    <section className="p-[32px] pb-[20px] bg game-shadow mt-[24px] flex gap-[36px] flex-col md:flex-row">
      <article className="md:min-w-[220px] md:max-w-[224px] flex flex-col gap-[12px]">
        {game?.summary && (
          <>
            <Description description={game?.summary} />
            <Hr />
          </>
        )}
        {!Array.isArray(developer) ||
          !Array.isArray(publisher) ||
          (game?.first_release_date && (
            <>
              <Information
                developer={developer[0].name}
                publisher={publisher[0].name}
                release_date={game?.first_release_date}
              />
              <Hr />
            </>
          ))}
        {platforms && <Platforms platforms={platforms} />}
      </article>
      <section className="flex flex-col gap-[24px] overflow-hidden ml-[-32px] md:ml-0 mr-[-32px]">
        {game?.videos && <Trailers videos={videos} />}
        {screenshots && <Screenshots screenshots={screenshots} />}
      </section>
    </section>
  );
}

function Trailers({ videos }) {
  return (
    <article>
      <h2 className="font-bold tracking-[0.96px] uppercase pl-[32px] md:pl-0">
        Trailers
      </h2>
      <div className="flex gap-[18px] overflow-x-scroll py-[12px] pl-[32px] md:pl-0 pr-[32px]">
        {videos?.map((video) => (
          <div className="w-[462px]">
            <iframe
              width={462}
              height={260}
              src={`https://www.youtube.com/embed/${video.video_id}`}
              className="rounded-[2px]"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </article>
  );
}

function Screenshots({ screenshots }) {
  return (
    <article>
      <h2 className="font-bold tracking-[0.96px] uppercase pl-[32px] md:pl-0">
        Screenshots
      </h2>
      <div className="flex gap-[18px] overflow-x-scroll py-[12px] pl-[32px] md:pl-0 pr-[32px]">
        {screenshots?.map((screenshot) => (
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.png`}
            alt={`${screenshot.image_id}-screenshot`}
            className="rounded-[2px] max-w-none w-[462px] h-[260px] object-cover"
          />
        ))}
      </div>
    </article>
  );
}

function Platforms({ platforms }) {
  return (
    <section>
      <h2 className="font-bold tracking-[0.96px] uppercase">Platforms</h2>
      <article className="pt-[12px] gap-[8px] flex flex-col">
        {platforms?.map((platform) => (
          <p className="text-[10px] tracking-[0.6px] uppercase font-medium opacity-60">
            {platform.name}
          </p>
        ))}
      </article>
    </section>
  );
}

function Information({ developer, publisher, release_date }) {
  const release = timeConverter(release_date);

  return (
    <section>
      <h2 className="font-bold tracking-[0.96px] uppercase">Information</h2>
      <article className="flex flex-col gap-[12px] pt-[12px]">
        {developer && (
          <section className="flex flex-col gap-[3px]">
            <h3 className="text-[10px] tracking-[0.6px] uppercase font-semibold">
              Developer
            </h3>
            <p className="text-[10px] tracking-[0.6px] uppercase font-medium opacity-60">
              {developer}
            </p>
          </section>
        )}
        {publisher && (
          <section className="flex flex-col gap-[3px]">
            <h3 className="text-[10px] tracking-[0.6px] uppercase font-semibold">
              Publisher
            </h3>
            <p className="text-[10px] tracking-[0.6px] uppercase font-medium opacity-60">
              {publisher}
            </p>
          </section>
        )}
        {release_date && (
          <section className="flex flex-col gap-[3px]">
            <h3 className="text-[10px] tracking-[0.6px] uppercase font-semibold">
              Release Date
            </h3>
            <p className="text-[10px] tracking-[0.6px] uppercase font-medium opacity-60">
              {release}
            </p>
          </section>
        )}
      </article>
    </section>
  );
}
