import { SignedIn, SignedOut, UserButton, currentUser } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser();
  console.log(user?.username)

  return (
    <main>
      <UserButton afterSignOutUrl="/" />
      <h1 className="text-red-500">GameHub</h1>
      <SignedIn>GODDAV {user?.firstName || user?.username || "Stranger"}</SignedIn>
      <SignedOut>LOG IND LEAN FORHELVEDE</SignedOut>
    </main>
  );
}
