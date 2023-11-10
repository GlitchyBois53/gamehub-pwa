// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import Search from "../../../components/shared/Search";
import FeaturedPlatforms from "../../../components/games/FeaturedPlatforms";
import { fetchGameData } from "../../../lib/fetchGameData";
import GameContainer from "../../../components/shared/GameContainer";

export default async function Games() {
  // Fetching games with a high critic rating
  const criticsChoice = await fetchGameData(
    "games",
    `fields name, rating, genres, total_rating, first_release_date, slug, cover;
    where aggregated_rating != null & first_release_date != null & keywords != (2004, 24124, 25522, 33402, 1603, 4472) & category = (0, 8, 9, 10) & version_parent = null & genres != null & cover != null & aggregated_rating_count > 5;
    sort aggregated_rating desc;
    limit 20;
    `
  );

  const time = new Date().getTime() / 1000;

  // Fetching games recently released with a rating count of 3 or more
  const newReleases = await fetchGameData(
    "games",
    `fields name, rating, genres, total_rating, first_release_date, slug, cover;
    where aggregated_rating != null & first_release_date != null & first_release_date < ${Math.ceil(
      time
    )} & keywords != (2004, 24124, 25522, 33402, 1603, 4472) & category = (0, 4, 8, 9, 10) & version_parent = null & genres != null & cover != null & aggregated_rating_count > 1;
    sort first_release_date desc;
    limit 20;
    `
  );

  // Fetching games that are coming soon
  const comingSoon = await fetchGameData(
    "games",
    `fields name, rating, genres, total_rating, first_release_date, slug, cover;
    where first_release_date != null & first_release_date > ${Math.ceil(
      time
    )} & keywords != (2004, 24124, 25522, 33402, 1603, 4472) & category = (0, 8, 9, 10) & version_parent = null & genres != null & cover != null;
    sort first_release_date asc;
    limit 20;
    `
  );

  return (
    <div>
      <Search />
      <FeaturedPlatforms />
      <div className="mt-[32px]">
        <GameContainer
          arr={criticsChoice}
          title={"Critic's Choice"}
          isScrollable={true}
          isLink={true}
          href={`/search/?sort=aggregated_rating&order=desc`}
        />
      </div>
      <div className="mt-[20px]">
        <GameContainer
          arr={newReleases}
          title={"New Releases"}
          isScrollable={true}
        />
      </div>
      <div className="mt-[20px]">
        <GameContainer
          arr={comingSoon}
          title={"Coming Soon"}
          isScrollable={true}
        />
      </div>
    </div>
  );
}
