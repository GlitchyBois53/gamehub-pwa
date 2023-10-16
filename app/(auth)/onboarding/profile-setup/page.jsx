import { currentUser } from '@clerk/nextjs';
import { updateUser } from '../../../../lib/actions/user.actions';

export default async function ProfileSetup() {
  const user = await currentUser();

  if (user) {
    await updateUser({
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      username: user.username || '',
      path: '/',
      onboarded: true,
    });
  }

  return <h1>ProfileSetup</h1>;
}
