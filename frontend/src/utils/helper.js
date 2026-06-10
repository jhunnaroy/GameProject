// ============================
// Copy Room Code
// ============================
export const copyRoomCode =
async (roomCode) => {

  try {

    await navigator.clipboard.writeText(
      roomCode
    );

    return true;

  } catch (error) {

    console.error(error);

    return false;
  }
};

// ============================
// Format Timer
// ============================
export const formatTime =
(seconds) => {

  const mins =
    Math.floor(
      seconds / 60
    );

  const secs =
    seconds % 60;

  return `${mins}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// ============================
// Generate Avatar
// ============================
export const generateAvatar =
(name = "Player") => {

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&color=fff`;
};

// ============================
// Sort Leaderboard
// ============================
export const sortLeaderboard =
(players = []) => {

  return [...players].sort(
    (a, b) =>
      b.score - a.score
  );
};

// ============================
// Random Color
// ============================
export const getRandomColor =
() => {

  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ];

  return colors[
    Math.floor(
      Math.random() *
        colors.length
    )
  ];
};

// ============================
// Get Winner
// ============================
export const getWinner =
(players = []) => {

  if (
    !players.length
  ) {
    return null;
  }

  return [...players].sort(
    (a, b) =>
      b.score - a.score
  )[0];
};

// ============================
// Generate Player Color
// ============================
export const getPlayerColor =
(playerName) => {

  let hash = 0;

  for (
    let i = 0;
    i < playerName.length;
    i++
  ) {

    hash =
      playerName.charCodeAt(i) +
      ((hash << 5) - hash);
  }

  const color =
    (hash & 0x00ffffff)
      .toString(16)
      .toUpperCase();

  return (
    "#" +
    "00000".substring(
      0,
      6 - color.length
    ) +
    color
  );
};

// ============================
// Mask Word
// ============================
export const maskWord =
(word = "") => {

  return word
    .split("")
    .map(() => "_")
    .join(" ");
};

// ============================
// Capitalize
// ============================
export const capitalize =
(text = "") => {

  return (
    text.charAt(0)
      .toUpperCase() +
    text.slice(1)
  );
};

// ============================
// Check Drawer
// ============================
export const isDrawer =
(
  currentPlayer,
  currentDrawer
) => {

  return (
    currentPlayer ===
    currentDrawer
  );
};

// ============================
// Room Full?
// ============================
export const isRoomFull =
(
  players,
  maxPlayers
) => {

  return (
    players.length >=
    maxPlayers
  );
};v*