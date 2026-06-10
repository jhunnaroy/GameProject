export const generateHint = (
  word,
  revealCount = 1
) => {

  const hint =
    Array(word.length)
      .fill("_");

  const indexes =
    [];

  while (
    indexes.length <
    revealCount
  ) {

    const randomIndex =
      Math.floor(
        Math.random() *
        word.length
      );

    if (
      !indexes.includes(
        randomIndex
      )
    ) {

      indexes.push(
        randomIndex
      );

    }
  }

  indexes.forEach(
    (index) => {
      hint[index] =
        word[index];
    }
  );

  return hint.join(" ");
};

export const getHintByTime =
(
  word,
  timeRemaining
) => {

  if (
    timeRemaining <= 40 &&
    timeRemaining > 20
  ) {

    return generateHint(
      word,
      1
    );

  }

  if (
    timeRemaining <= 20
  ) {

    return generateHint(
      word,
      2
    );

  }

  return Array(
    word.length
  )
    .fill("_")
    .join(" ");
};