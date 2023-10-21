import { fetchGameData } from "../../../lib/fetchGameData";
import SearchBar from "../../../components/shared/Search";
import GameContainer from "../../../components/shared/GameContainer";
import Pagination from "../../../components/shared/Pagination";
import GameLimitProvider from "../../../components/shared/GameLimitProvider";

export default async function Search({ searchParams }) {
  const resultsPerPage = searchParams?.limit || 21;

  const games = await fetchGameData(
    "games",
    `
    fields name, rating, genres, total_rating, first_release_date, slug, cover; 
    where name ~ *"${
      searchParams.search
    }"* & version_parent = null & genres != null & cover != null & first_release_date != null & keywords != (2004, 2555) & category = (0, 10); 
    limit ${resultsPerPage};
    offset ${searchParams.offset || "0"}; 
    sort first_release_date desc;
    `
  );

  const isGipperish = games?.length === 0 && searchParams.offset == null;
  const isNoMoreResults = games?.length === 0 && searchParams.offset != null;

  return (
    <div>
      <SearchBar isSearchPage={true} searchParams={searchParams} />
      {isGipperish ? (
        <p>NO RESULT DUMMY</p>
      ) : isNoMoreResults ? (
        <p>NO MORE RESULT DUMMY</p>
      ) : (
        <GameLimitProvider searchParams={searchParams}>
          <GameContainer arr={games} title={""} />
        </GameLimitProvider>
      )}
      {!isGipperish && (
        <Pagination
          searchParams={searchParams}
          results={games?.length}
          resultsPerPage={resultsPerPage}
        />
      )}
    </div>
  );
}
