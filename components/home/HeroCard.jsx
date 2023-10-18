import { useStore } from '../../app/store';

export default function HeroCard({ screenshot, cover, rating, name }) {
  let windowWidth = null;

  window.addEventListener('resize', () => {
    console.log(window.innerWidth);
  });

  const formattedRating = rating / 10;
  const theme = useStore((store) => store.theme);
  return (
    <div className="md:h-[402px] h-[300px] lg:h-[600px] w-full relative overflow-hidden rounded-[2px]">
      <img
        src={`https://images.igdb.com/igdb/image/upload/t_720p/${screenshot.image_id}.png`}
        alt=""
        className="w-full h-full object-cover blur-[4px] scale-105"
      />
      <div className="absolute inset-0 bg-black/20 flex flex-col md:flex-row justify-center md:justify-start md:items-end md:p-[54px] p-[12px]">
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.png`}
          alt=""
          className="md:h-[294px] md:w-[220px] h-[147px] w-[110px] object-cover rounded-[2px]"
        />
        <article className='w-full'>
          <p>{formattedRating.toFixed(1)}</p>
          <h2 className="md:text-[52px] font-bold md:tracking-[3.12px] w-full uppercase truncate">
            {name}
          </h2>
        </article>
      </div>
    </div>
  );
}
