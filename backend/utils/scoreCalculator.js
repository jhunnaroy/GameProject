export const calculateScore = (
  remainingTime,
  totalTime = 60
) => {
  const maxScore = 200;
  const minScore = 50;

  return Math.floor(
    minScore +
      (remainingTime / totalTime) *
        (maxScore - minScore)
  );
};

export const calculateDrawerScore = (
  totalPlayers
) => {
  return (totalPlayers - 1) * 20;
};