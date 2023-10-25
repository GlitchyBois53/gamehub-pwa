import { fetchGameData } from '../../lib/fetchGameData.js';
import ImageSlider from './ImageSlider.jsx';

export default async function ImageSliderContainer({ games }) {
  const gameCoverIdArr = games?.map((game) => game.cover);
  const gameCoverArr = await fetchGameData(
    'covers',
    `fields image_id; where id = (${gameCoverIdArr}); limit 4;`
  );

  const gameScreenshotIdArr = games?.map((game) => game.screenshots);
  const gameScreenshotArr = await fetchGameData(
    'screenshots',
    `fields image_id; where id = (${gameScreenshotIdArr}); limit 100;`
  );

  //   TODO: I Will put the in the MAYBE pile for now

  //   const gameCompanyIdArr = games.map((game) => game.involved_companies[0]);
  //   const gameCompanyArr = await fetchGameData(
  //     'involved_companies',
  //     `fields company; where id = (${gameCompanyIdArr}); limit 4;`
  //   );

  //   const companyIdArray = gameCompanyArr.map((company) => company.company);
  //   const companyArr = await fetchGameData(
  //     'companies',
  //     `fields name, logo; where id = (${companyIdArray}); limit 4;`
  //   );

  //   const companyLogoIdArr = companyArr.map((company) => company.logo);
  //   const companyLogoArr = await fetchGameData(
  //     'company_logos',
  //     `fields image_id; where id = (${companyLogoIdArr}); limit 4;`
  //   );

  return <ImageSlider games={games} coverArr={gameCoverArr} screenshotArr={gameScreenshotArr} />;
}
