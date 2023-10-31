import GameContainer from "../../../../components/shared/GameContainer";
import GameLimitProvider from "../../../../components/shared/GameLimitProvider";
import HeadTextProvider from "../../../../components/shared/HeadTextProvider";
import Pagination from "../../../../components/shared/Pagination";
import SearchContainer from "../../../../components/shared/SearchContainer";
import { fetchUser } from "../../../../lib/actions/user.actions";
import { fetchGameData } from "../../../../lib/fetchGameData";
import Heading from "../../../../components/shared/Heading";
import Container from "../../../../components/shared/Container";
import TooFar from "../../../../components/shared/TooFar";
import Button from "../../../../components/shared/Button";
import { currentUser } from "@clerk/nextjs";

export default async function Wishlist({ params, searchParams }) {
  const user = await fetchUser(params.id);
  const wishlistIdArr = user?.wishlist.map((game) => game.gameId);

  const clerkUser = await currentUser();

  const search = searchParams?.search;
  const resultsPerPage = searchParams?.limit || 21;
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

  let games = null;

  if (wishlistIdArr.length !== 0) {
    games = await fetchGameData(
      "games",
      `
    fields name, rating, genres, total_rating, first_release_date, slug, cover;
    where
    id = (${wishlistIdArr}) &
    ${
      search ? `name ~ *"${search}"* &` : ""
    } version_parent = null & genres != null & cover != null &
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
  }

  const isEmpty = user?.wishlist?.length === 0;
  const isGipperish = games?.length === 0 && searchParams.offset == 0;
  const isNoMoreResults = games?.length === 0 && searchParams.offset != 0;

  return (
    <HeadTextProvider headText={`${user?.username}'s wishlist`}>
      <Heading
        text={"Wishlist"}
        clerkId={user?.clerkId}
        image={user?.image}
        username={user?.username}
      />
      <Container>
        {isEmpty ? (
          <div className="h-full w-full flex items-center justify-center flex-col gap-[12px] min-h-container-mobile md:min-h-container my-[-36px]">
            <p className="text-center uppercase text-[14px] tracking-[0.84px] font-semibold mb-[24px]">
              You currently have no games in your wishlist.
            </p>
            <Button
              text={"Add Games"}
              icon={"/plus.svg"}
              isLink={true}
              href={"/games"}
            />
          </div>
        ) : (
          <>
            <SearchContainer
              isPersonalPage={true}
              searchParams={searchParams}
              value={searchParams.search}
              placeholder={"Search for a game in wishlist..."}
            />

            {isGipperish ? (
              <div className="h-full w-full flex items-center justify-center flex-col gap-[12px] min-h-container-mobile md:min-h-container mb-[-42px] mt-[-108px]">
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
              <GameLimitProvider searchParams={searchParams}>
                <GameContainer
                  arr={games}
                  title={""}
                  isPersonalPage={clerkUser?.id === user?.clerkId}
                  clerkId={clerkUser?.id}
                />
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
          </>
        )}
      </Container>
    </HeadTextProvider>
  );
}
