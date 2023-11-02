// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import { fetchGameData } from '../../lib/fetchGameData.js';
import ImageSlider from './ImageSlider.jsx';

export default async function ImageSliderContainer({ games }) {
  // fetch the cover and screenshot data for the games
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
  
  return <ImageSlider games={games} coverArr={gameCoverArr} screenshotArr={gameScreenshotArr} />;
}
