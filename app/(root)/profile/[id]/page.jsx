import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "../../../../lib/actions/user.actions";

export default async function Profile({ params }) {
  const clerkUser = await currentUser();
  const user = await fetchUser(params.id);

  console.log(user);

  return <div></div>;
}
