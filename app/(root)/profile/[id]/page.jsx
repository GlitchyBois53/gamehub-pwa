import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "../../../../lib/actions/user.actions";
import Heading from "../../../../components/shared/Heading";
import Container from "../../../../components/shared/Container";
import Button from "../../../../components/shared/Button";
import { genres } from "../../../../constants";
import UserCard from "../../../../components/profile/UserCard";
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
          <div className="bg shadow-search game-shadow rounded-[2px] flex justify-between p-[36px] items-start">
            <article className="flex items-center gap-[32px]">
              <img
                src={user?.image}
                alt={`${user?.username}-profile-phote`}
                className="w-[250px] aspect-square object-cover rounded-full"
              />
              <section>
                <h2 className="text-[48px] tracking-[2.88px] uppercase font-bold bg-game-grad bg-clip-text text-transparent translate-x-[-2px]">
                  {user?.username}
                </h2>
                <h3 className="text-[12px] tracking-[0.72px] opacity-60 font-semibold translate-y-[-4px] uppercase">
                  {" "}
                  {user?.email}
                </h3>
                <div className="flex gap-[10px] flex-wrap pt-[6px] pb-[10px]">
                  {genreIdArr.map((genre) => {
                    const title = genres.find((g) => g.genreId == genre).name;
                    return (
                      <Button
                        text={title}
                        variant={"tertiary"}
                        isLink={true}
                        href={`/search?genres=${genre}&title=${title}`}
                        attributes="text-[10px] tracking-[0.6px] px-[12px] py-[6px]"
                      />
                    );
                  })}
                </div>
                <UserCard
                  libraryLength={user?.library?.length || 0}
                  wishlistLength={user?.wishlist?.length || 0}
                  friendsLength={user?.friends?.length || 0}
                />
              </section>
            </article>
            {clerkUser.id === user?.clerkId && (
              <Button
                icon={"/edit-icon.png"}
                text="edit profile"
                isLink={true}
                href={"/onboarding/profile-setup"}
                attributes="text-[10px] tracking-[0.6px] px-[13px] py-[10px] font-semibold"
              />
            )}
          </div>
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
