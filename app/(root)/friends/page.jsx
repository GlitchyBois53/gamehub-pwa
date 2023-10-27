import Container from "../../../components/shared/Container";
import FriendCard from "../../../components/friends/FriendCard";
import Heading from "../../../components/shared/Heading";
import FriendContainer from "../../../components/friends/FriendContainer";
import {
  fetchAllUsers,
  fetchFriendRequests,
  fetchFriends,
  fetchUser,
} from "../../../lib/actions/user.actions";
import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";

export default async function Friends() {
  const clerkUser = await currentUser();
  let dbUser = null;

  if (clerkUser) {
    dbUser = await fetchUser(clerkUser?.id);
  }

  const users = await fetchAllUsers();

  const friendRequests = await fetchFriendRequests(clerkUser?.id);

  const formattedFriendRequests = friendRequests?.map((user) => {
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

  const loggedInUser = formattedUsers?.find(
    (user) => user?.clerkId === clerkUser?.id
  );

  const friends = await fetchFriends(clerkUser?.id);

  const formattedFriends = friends?.map((user) => {
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

  return (
    <>
      <Heading text={"Friends"} />
      <Container noPagination={true}>
        <SignedIn>
          <FriendContainer
            clerkId={clerkUser?.id}
            users={formattedUsers}
            friendRequests={formattedFriendRequests}
          />
          <div className="flex flex-col gap-[12px] mt-[24px]">
            {formattedFriends?.map((friend) => {
              const commonGamesArr = friend?.library?.filter((game) =>
                loggedInUser?.library?.includes(game)
              );

              return (
                <FriendCard
                  key={friend?.clerkId}
                  friendId={friend?.clerkId}
                  commonGames={commonGamesArr?.length}
                  email={friend?.email}
                  image={friend?.image}
                  totalGames={friend?.library?.length}
                  username={friend?.username}
                  clerkId={clerkUser?.id}
                />
              );
            })}
          </div>
        </SignedIn>
        <SignedOut>
          {/* TODO: ADD CTA TO SIGN IN */}
          <p>YOU DONT LOG IN BITCH</p>
        </SignedOut>
      </Container>
    </>
  );
}
