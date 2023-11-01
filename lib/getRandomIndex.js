// This function returns a random index from an array
export function getRandomIndex(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
}
