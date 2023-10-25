import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "../../../../lib/actions/user.actions";
import Heading from "../../../../components/shared/Heading";
import Container from "../../../../components/shared/Container";
import Button from "../../../../components/shared/Button";
import { genres } from "../../../../constants";
import UserCard from "../../../../components/profile/UserCard";
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

  const library = await fetchGameData(
    "games",
    `fields name, rating, genres, total_rating, first_release_date, slug, cover;
    where id = (${libraryIdArr});
    limit 20;
    `
  );

  const wishlist = await fetchGameData(
    "games",
    `fields name, rating, genres, total_rating, first_release_date, slug, cover;
    where id = (${wishlistIdArr});
    limit 20;
    `
  );

  return (
    <HeadTextProvider headText={`${user?.username}'s Profile`}>
      <div>
        <Heading text={"Profile"} />
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
            />
            <GameContainer
              icon={"/wishlist-icon-grad.png"}
              arr={wishlist}
              title={"Wishlist"}
              href={`/wishlist/${user?.clerkId}`}
              isLink={true}
              isScrollable={true}
            />
          </div>
        </Container>
      </div>
    </HeadTextProvider>
  );
}
