import { Fragment } from 'react';
import { fetchGameData } from '../../../lib/fetchGameData';
import SearchBar from '../../../components/shared/Search';

export default async function Search({ searchParams }) {
  const games = await fetchGameData(
    'games',
    `
    fields name, rating, aggregated_rating, genres, total_rating, first_release_date, keywords; 
    where name ~ *"${searchParams.search}"* & version_parent = null & first_release_date != null & keywords != (2004, 2555) & category = (0, 10); 
    limit 20; 
    sort first_release_date desc;
    `
  );
  return (
    <div>
      <SearchBar />
      {games.map((game) => (
        <Fragment key={game.id}>
          <h2>{game?.name}</h2>
          <ul>
            {game?.genres?.map((genre) => (
              <li>{genre}</li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
}
