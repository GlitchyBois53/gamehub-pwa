import Container from "../../../components/shared/Container";
import Heading from "../../../components/shared/Heading";
import FriendContainer from "../../../components/friends/FriendContainer";
import { fetchAllUsers } from "../../../lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Friends() {
  const clerkUser = await currentUser();
  const users = await fetchAllUsers();

  return (
    <div>
      <Heading text={"Friends"} />
      <Container noPagination={true}>
        <FriendContainer clerkId={clerkUser?.id} />
      </Container>
    </div>
  );
}
