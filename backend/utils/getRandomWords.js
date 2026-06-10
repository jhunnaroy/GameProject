import wordCategories from "./words.js";

export const getRandomWords = (
  count = 3
) => {

  const allWords =
    Object.values(
      wordCategories
    ).flat();

  const shuffled =
    allWords.sort(
      () => Math.random() - 0.5
    );

  return shuffled.slice(
    0,
    count
  );

};