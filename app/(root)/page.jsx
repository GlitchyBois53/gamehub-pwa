import { UserButton, currentUser } from '@clerk/nextjs';
import { fetchGameData } from '../../lib/fetchGameData.js';
import { fetchUser } from '../../lib/actions/user.actions.js';
import { redirect } from 'next/navigation.js';

export default async function Home() {
  const searchLine = "Assassin's Creed";

  // import userdata from clerk, to check whether the user is logged in or not
  const clerkUser = await currentUser();
  let dbUser = null;

  // if the user is logged in, check whether the user is onboarded or not
  if (clerkUser) {
    dbUser = await fetchUser(clerkUser.id);
    // if the user is not onboarded, redirect to the onboarding page
    if (!dbUser.onboarded) {
      redirect('/onboarding/profile-setup');
    }
  }

  const games = await fetchGameData(
    'games',
    `
      fields name, rating, aggregated_rating, genres, total_rating, first_release_date, keywords; 
      where name ~ *"${searchLine}"* & version_parent = null & first_release_date != null & keywords != (2004, 2555) & category = (0, 10); 
      limit 20; 
      sort first_release_date desc;
    `
  );

  return (
    <main>
      <UserButton afterSignOutUrl="/" />
      {games.map((game) => (
        <h2>{game.name}</h2>
      ))}
    </main>
  );
}
