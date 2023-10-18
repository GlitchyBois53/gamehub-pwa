import { currentUser } from '@clerk/nextjs';
import { fetchGameData } from '../../lib/fetchGameData.js';
import { fetchUser } from '../../lib/actions/user.actions.js';
import { redirect } from 'next/navigation.js';
import Search from '../../components/shared/Search.jsx';
import GameContainer from '../../components/shared/GameContainer.jsx';
import WelcomeWrapper from '../../components/shared/WelcomeWrapper.jsx';
import { genres } from '../../constants/index.js';
import { getRandomIndex } from '../../lib/getRandomIndex.js';
import {
  alphabet,
  igdbSortMethods,
  igdbSortOrders,
} from '../../constants/index.js';

export default async function Home() {
  // import userdata from clerk, to check whether the user is logged in or not
  const clerkUser = await currentUser();
  let dbUser = null;
  const defaultGenres = ['5', '12', '31'];

  // if the user is logged in, check whether the user is onboarded or not
  if (clerkUser) {
    dbUser = await fetchUser(clerkUser.id);
    // if the user is not onboarded, redirect to the onboarding page
    if (!dbUser) {
      redirect('/onboarding/profile-setup');
    }
    if (dbUser?.onboarded === false) {
      redirect('/onboarding/profile-setup');
    }
  }

  const genreIdArr = dbUser?.genres.map((genre) => genre.genreId);
  const genreChoices = genreIdArr || defaultGenres;

  let recommendedGames = null;

  const randomLetterIndex = getRandomIndex(alphabet);
  const randomSortMethodIndex = getRandomIndex(igdbSortMethods);
  const randomSortMethodOrder = getRandomIndex(igdbSortOrders);

  if (genreIdArr && genreIdArr.length !== 0) {
    recommendedGames = await fetchGameData(
      'games',
      `
      fields name, genres, total_rating, first_release_date, slug, cover; 
      where genres = (${genreIdArr}) & name ~*"${alphabet[randomLetterIndex]}"* & version_parent = null & first_release_date != null & aggregated_rating_count > 5 & keywords != (2004, 2555) & category = (0, 10) & total_rating > 80; 
      limit 15; 
      sort ${igdbSortMethods[randomSortMethodIndex]} ${igdbSortOrders[randomSortMethodOrder]};
      `
    );
  }

  return (
    <WelcomeWrapper
      clerkUser={clerkUser ? true : false}
      username={dbUser?.username}
    >
      <main>
        <Search />
        <div className="flex flex-col gap-[12px] mt-[24px]">
          {dbUser && dbUser.genres.length !== 0 && (
            <GameContainer
              title={'Recommended for you'}
              arr={recommendedGames}
              isScrollable={true}
            />
          )}
          {genreChoices.map(async (genre) => {
            const randomLetterIndex = getRandomIndex(alphabet);
            const randomSortMethodIndex = getRandomIndex(igdbSortMethods);
            const randomSortMethodOrder = getRandomIndex(igdbSortOrders);

            const genreData = await fetchGameData(
              'games',
              `
            fields name, genres, total_rating, first_release_date, slug, cover; 
            where genres = (${genre}) & name ~*"${alphabet[randomLetterIndex]}"* & version_parent = null & first_release_date != null & aggregated_rating_count > 5 & keywords != (2004, 2555) & category = (0, 10) & total_rating > 80; 
            limit 15; 
            sort ${igdbSortMethods[randomSortMethodIndex]} ${igdbSortOrders[randomSortMethodOrder]};
            `
            );
            const title = genres.find(
              (genreArr) => genreArr.genreId == genre
            ).name;

            return (
              <GameContainer
                arr={genreData}
                title={title}
                isScrollable={true}
              />
            );
          })}
        </div>
      </main>
    </WelcomeWrapper>
  );
}
