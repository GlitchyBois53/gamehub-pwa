import Container from "../../../components/shared/Container";
import FriendCard from "../../../components/friends/FriendCard";
import Heading from "../../../components/shared/Heading";
import FriendContainer from "../../../components/friends/FriendContainer";
import {
  fetchAllUsers,
  fetchFriends,
  fetchUser,
} from "../../../lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Friends() {
  const clerkUser = await currentUser();
  let dbUser = null;

  if (clerkUser) {
    dbUser = await fetchUser(clerkUser?.id);
  }

  const users = await fetchAllUsers();

  const formattedUsers = users.map((user) => {
    const userLibrary = user?.library?.map((game) => game.gameId);
    const userFriends = user?.friends?.map((friend) => friend.clerkId);
    const receivedRequests = user?.receivedRequests?.map(
      (request) => request.clerkId
    );
    const sentRequests = user?.sentRequests?.map((request) => request.clerkId);

    return {
      clerkId: user?.clerkId,
      email: user?.email,
      image: user?.image,
      username: user?.username,
      library: userLibrary,
      friends: userFriends,
      receivedRequests: receivedRequests,
      sentRequests: sentRequests,
    };
  });

  console.log(formattedUsers);

  const friends = await fetchFriends(clerkUser?.id);
  const libraryIdArr = dbUser?.library?.map((game) => game.gameId);

  return (
    <>
      <Heading text={"Friends"} />
      <Container noPagination={true}>
        <FriendContainer clerkId={clerkUser?.id} users={formattedUsers} />
        <div className="flex flex-col gap-[12px] mt-[24px]">
          {friends.map((friend) => {
            const commonGames = friends.flatMap((friend) => {
              const friendLibraryIdArr = friend?.library?.map(
                (game) => game.gameId
              );
              return libraryIdArr.filter((gameId) =>
                friendLibraryIdArr.includes(gameId)
              );
            });
            return (
              <FriendCard
                friendId={friend?.clerkId}
                commonGames={commonGames?.length}
                email={friend?.email}
                image={friend?.image}
                totalGames={friend?.library?.length}
                username={friend?.username}
                clerkId={clerkUser?.id}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
}
