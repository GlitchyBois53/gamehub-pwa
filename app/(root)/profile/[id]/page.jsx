import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "../../../../lib/actions/user.actions";
import Heading from "../../../../components/shared/Heading";
import Container from "../../../../components/shared/Container";
import UserInfo from "../../../../components/profile/UserInfo";
import HeadTextProvider from "../../../../components/shared/HeadTextProvider";
import { fetchGameData } from "../../../../lib/fetchGameData";
import GameContainer from "../../../../components/shared/GameContainer";

export default async function Profile({ params }) {
  const clerkUser = await currentUser();
  const user = await fetchUser(params.id);

  const genreIdArr = user?.genres?.map((genre) => genre.genreId);
  const libraryIdArr = user?.library?.map((game) => game.gameId);
  const wishlistIdArr = user?.wishlist?.map((game) => game.gameId);

  let library = [];
  // Fetching the games in the user's library
  if (libraryIdArr.length !== 0) {
    library = await fetchGameData(
      "games",
      `fields name, rating, genres, total_rating, first_release_date, slug, cover;
      where id = (${libraryIdArr});
      limit 20;
      `
    );
  }
  let wishlist = [];
  // Fetching the games in the user's wishlist
  if (wishlistIdArr.length !== 0) {
    wishlist = await fetchGameData(
      "games",
      `fields name, rating, genres, total_rating, first_release_date, slug, cover;
      where id = (${wishlistIdArr});
      limit 20;
      `
    );
  }

  return (
    <HeadTextProvider headText={`${user?.username}'s Profile`}>
      <div>
        <Heading
          text={"Profile"}
          clerkId={user?.clerkId}
          image={user?.image}
          username={user?.username}
        />
        <Container noPagination={true}>
          <UserInfo
            email={user?.email}
            username={user?.username}
            genreIdArr={genreIdArr}
            friendsLength={user?.friends.length}
            libraryLength={user?.library.length}
            wishlistLength={user?.wishlist.length}
            image={user?.image}
            clerkId={clerkUser?.id}
            userId={user?.clerkId}
          />

          <div className="mt-[24px]">
            <GameContainer
              icon={"/library-icon-grad.svg"}
              arr={library}
              title={"Library"}
              href={`/library/${user?.clerkId}`}
              isLink={true}
              isScrollable={true}
              isEmpty={library.length === 0}
              isCurrentUserProfile={clerkUser?.id === user?.clerkId}
              isPersonalPage={clerkUser?.id === user?.clerkId}
              clerkId={clerkUser?.id}
              isLibrary={true}
            />
            <GameContainer
              icon={"/wishlist-icon-grad.png"}
              arr={wishlist}
              title={"Wishlist"}
              href={`/wishlist/${user?.clerkId}`}
              isLink={true}
              isScrollable={true}
              isEmpty={wishlist.length === 0}
              isCurrentUserProfile={clerkUser?.id === user?.clerkId}
              isPersonalPage={clerkUser?.id === user?.clerkId}
              clerkId={clerkUser?.id}
            />
          </div>
        </Container>
      </div>
    </HeadTextProvider>
  );
}
