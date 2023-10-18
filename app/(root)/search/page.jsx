import { fetchGameData } from '../../../lib/fetchGameData';
import SearchBar from '../../../components/shared/Search';
import GameContainer from '../../../components/shared/GameContainer';
import Pagination from '../../../components/shared/Pagination';

export default async function Search({ searchParams }) {
  const games = await fetchGameData(
    'games',
    `
    fields name, rating, genres, total_rating, first_release_date, slug, cover; 
    where name ~ *"${
      searchParams.search
    }"* & version_parent = null & genres != null & cover != null & first_release_date != null & keywords != (2004, 2555) & category = (0, 10); 
    limit 21;
    offset ${searchParams.offset || '0'}; 
    sort first_release_date desc;
    `
  );

  const isGipperish = games?.length === 0 && searchParams.offset == null;
  const isNoMoreResults = games?.length === 0 && searchParams.offset != null;

  return (
    <div>
      <SearchBar />
      {isGipperish ? (
        <p>NO RESULT DUMMY</p>
      ) : isNoMoreResults ? (
        <p>NO MORE RESULT DUMMY</p>
      ) : (
        <GameContainer arr={games} title={''} />
      )}
      {!isGipperish && (
        <Pagination searchParams={searchParams} results={games?.length} />
      )}
    </div>
  );
}
