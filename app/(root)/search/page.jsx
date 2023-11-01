import { fetchGameData } from "../../../lib/fetchGameData";
import SearchContainer from "../../../components/shared/SearchContainer";
import GameContainer from "../../../components/shared/GameContainer";
import Pagination from "../../../components/shared/Pagination";
import GameLimitProvider from "../../../components/shared/GameLimitProvider";
import TooFar from "../../../components/shared/TooFar";
import Limit from "../../../components/shared/Limit";

export default async function Search({ searchParams }) {
  // Setting the search params for filtering
  const search = searchParams?.search;
  const resultsPerPage = searchParams?.limit || 24;
  const offset = searchParams?.offset || 0;
  const platforms = searchParams?.platforms;
  const genres = searchParams?.genres;
  const themes = searchParams?.themes;
  const ratings = searchParams?.ratings;
  const modes = searchParams?.modes;
  const sort = searchParams?.sort || "first_release_date";
  const order = searchParams?.order || "desc";

  const years = searchParams?.years;
  const yearsSplit = years?.split("-");

  // Fetching the games with the provided search params
  const games = await fetchGameData(
    "games",
    `
    fields name, rating, genres, total_rating, first_release_date, slug, cover;
    where  
    ${
      search ? `name ~ *"${search}"* &` : ""
    } version_parent = null & genres != null & cover != null & ${
      sort === "total_rating"
        ? "total_rating != null & total_rating_count > 3 &"
        : sort === "aggregated_rating"
        ? "aggregated_rating != null & aggregated_rating_count > 3 &"
        : sort === "rating"
        ? "rating != null & rating_count > 3 &"
        : ""
    } 
   first_release_date != null & keywords != (2004, 24124, 25522, 33402, 1603, 4472) & category = (0, 8, 9, 10) ${
     platforms ? `& platforms = (${platforms})` : ""
   }
    ${
      years
        ? `& first_release_date >= ${yearsSplit[0]} & first_release_date <= ${yearsSplit[1]}`
        : ""
    }
    ${genres ? `& genres = (${genres})` : ""}
    ${themes ? `& themes = (${themes})` : ""}
    ${ratings ? `& total_rating >= ${ratings}` : ""}
    ${modes ? `& game_modes = (${modes})` : ""}
    ; 
    limit ${resultsPerPage};
    offset ${offset}; 
    sort ${sort} ${order};
    `
  );

  // Checking whether the search is gipperish or not
  const isGipperish = games?.length === 0 && searchParams.offset == 0;
  const isNoMoreResults = games?.length === 0 && searchParams.offset != 0;

  return (
    <Limit searchParams={searchParams}>
      <div className="relative">
        <SearchContainer
          isSearchPage={true}
          searchParams={searchParams}
          value={searchParams?.search}
        />
        {isGipperish ? (
          <div className="h-full w-full flex items-center justify-center flex-col gap-[12px] min-h-container-mobile md:min-h-container my-[-36px]">
            <span className="text-[32px]">🤥</span>
            <p className="text-center uppercase text-[14px] tracking-[0.84px] font-semibold mb-[24px]">
              {searchParams.search
                ? `No results found for "${searchParams.search}"`
                : "No results found"}
            </p>
          </div>
        ) : isNoMoreResults ? (
          <TooFar searchParams={searchParams} />
        ) : (
          <GameContainer arr={games} title={""} />
        )}
        {!isGipperish && (
          <Pagination
            searchParams={searchParams}
            results={games?.length}
            resultsPerPage={resultsPerPage}
          />
        )}
      </div>
    </Limit>
  );
}
