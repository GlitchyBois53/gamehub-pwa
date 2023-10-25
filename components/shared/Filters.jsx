import FilterSection from './FilterSection';
import {
  filterPlatforms,
  years,
  genres,
  themes,
  ratings,
  gameModes,
} from '../../constants';
import { useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Button from './Button';
import Hr from './Hr';
import { motion as m } from 'framer-motion';

export default function Filters({ searchParams, setFiltersActive }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFilters, setActiveFilters] = useState('platforms');

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function clearFilters() {
    const search = searchParams?.search;
    const sort = searchParams?.sort || 'total_rating';
    const order = searchParams?.order || 'desc';
    const path =
      pathname + '?search=' + search + '&sort=' + sort + '&order=' + order;
    router.push(path);
    setFiltersActive(false);
  }

  const filters = [
    {
      name: 'platforms',
      param: 'platforms',
    },
    {
      name: 'years',
      param: 'years',
    },
    {
      name: 'genres',
      param: 'genres',
    },
    {
      name: 'themes',
      param: 'themes',
    },
    {
      name: 'ratings',
      param: 'ratings',
    },
    {
      name: 'modes',
      param: 'modes',
    },
];

  return (
    <m.div
      initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="flex flex-col gap-[10px] z-20 bg shadow-search absolute right-0 left-0 shadow-black/25 rounded-[2px] p-[18px] mt-[12px] min-h-[158px]"
    >
      <div className="flex justify-between items-center flex-col md:flex-row gap-[10px]">
        <article className="flex gap-[10px] flex-wrap justify-center md:justify-start">
          {filters.map((filter) => (
            <Button
              handleClick={() => setActiveFilters(filter.param)}
              text={filter.name}
              variant={filter.param === activeFilters ? '' : 'secondary'}
              key={filter.name}
            />
          ))}
        </article>
        <h2
          onClick={clearFilters}
          className="text-[12px] tracking-[0.72px] opacity-60 font-semibold hover:underline cursor-pointer uppercase"
        >
          Clear Filters
        </h2>
      </div>
      <Hr />
      <div className="flex flex-wrap gap-[10px] justify-center md:justify-start">
        {filterPlatforms.map((platform) => (
          <FilterSection
            name={platform.name}
            param={'platforms'}
            value={platform.hardware}
            fn={createQueryString}
            searchParams={searchParams.platforms}
            key={platform.hardware}
            activeFilter={activeFilters}
          />
        ))}
        {years.map((years) => (
          <FilterSection
            name={years.name}
            param={'years'}
            value={years.years}
            fn={createQueryString}
            searchParams={searchParams.years}
            key={years.years}
            activeFilter={activeFilters}
          />
        ))}
        {genres.map((genre) => (
          <FilterSection
            name={genre.name}
            param={'genres'}
            value={genre.genreId}
            fn={createQueryString}
            searchParams={searchParams.genres}
            key={genre.genreId}
            activeFilter={activeFilters}
          />
        ))}
        {themes.map((theme) => (
          <FilterSection
            name={theme.name}
            param={'themes'}
            value={theme.id}
            fn={createQueryString}
            searchParams={searchParams.themes}
            key={theme.id}
            activeFilter={activeFilters}
          />
        ))}
        {ratings.map((rating) => (
          <FilterSection
            name={rating.name}
            param={'ratings'}
            value={rating.rating}
            fn={createQueryString}
            searchParams={searchParams.ratings}
            key={rating.rating}
            activeFilter={activeFilters}
          />
        ))}
        {gameModes.map((mode) => (
          <FilterSection
            name={mode.name}
            param={'modes'}
            value={mode.id}
            fn={createQueryString}
            searchParams={searchParams.modes}
            key={mode.id}
            activeFilter={activeFilters}
          />
        ))}
      </div>
    </m.div>
  );
}
