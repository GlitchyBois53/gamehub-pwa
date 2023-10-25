import GameContainer from "../../../../components/shared/GameContainer";
import GameLimitProvider from "../../../../components/shared/GameLimitProvider";
import HeadTextProvider from "../../../../components/shared/HeadTextProvider";
import Pagination from "../../../../components/shared/Pagination";
import SearchContainer from "../../../../components/shared/SearchContainer";
import { fetchUser } from "../../../../lib/actions/user.actions";
import { fetchGameData } from "../../../../lib/fetchGameData";
import Heading from "../../../../components/shared/Heading";
import Container from "../../../../components/shared/Container";

export default async function Library({ params, searchParams }) {
  const user = await fetchUser(params.id);
  const libraryIdArr = user?.library.map((game) => game.gameId);

  const search = searchParams?.search;
  const resultsPerPage = searchParams?.limit || 21;
  const offset = searchParams?.offset || 0;
  const platforms = searchParams?.platforms;
  const genres = searchParams?.genres;
  const themes = searchParams?.themes;
  const ratings = searchParams?.ratings;
  const modes = searchParams?.modes;
  const sort = searchParams?.sort || "total_rating";
  const order = searchParams?.order || "desc";

  const years = searchParams?.years;
  const yearsSplit = years?.split("-");

  let games = null;

  if (libraryIdArr.length !== 0) {
    games = await fetchGameData(
      "games",
      `
    fields name, rating, genres, total_rating, first_release_date, slug, cover;
    where
    id = (${libraryIdArr}) &
    ${
      search ? `name ~ *"${search}"* &` : ""
    } version_parent = null & genres != null & cover != null & ${
        sort === "total_rating"
          ? "total_rating != null & total_rating_count > 5 &"
          : sort === "aggregated_rating"
          ? "aggregated_rating != null & aggregated_rating_count > 5 &"
          : sort === "rating"
          ? "rating != null & rating_count > 5 &"
          : ""
      } 
   first_release_date != null & keywords != (2004, 24124, 25522, 33402, 1603, 4472) & category = (0, 10) ${
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
  }

  const isGipperish = games?.length === 0 && searchParams.offset == null;
  const isNoMoreResults = games?.length === 0 && searchParams.offset != null;

  return (
    <HeadTextProvider headText={`${user?.username}'s Library`}>
      <Heading text={"Library"} />
      <Container>
        <SearchContainer
          searchParams={searchParams}
          value={searchParams.search}
          placeholder={"Search for a game in library..."}
        />
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
          <div className="absolute bottom-[18px] w-full translate-x-[-18px]">
            <Pagination
              searchParams={searchParams}
              results={games?.length}
              resultsPerPage={resultsPerPage}
            />
          </div>
        )}
      </Container>
    </HeadTextProvider>
  );
}
