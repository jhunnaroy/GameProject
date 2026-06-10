import {
  createContext,
  useContext,
  useState,
} from "react";

const GameContext =
  createContext();

export const GameProvider = ({
  children,
}) => {

  const [gameStarted, setGameStarted] =
    useState(false);

  const [gameEnded, setGameEnded] =
    useState(false);

  const [currentWord, setCurrentWord] =
    useState("");

  const [currentHint, setCurrentHint] =
    useState("");

  const [currentDrawer, setCurrentDrawer] =
    useState("");

  const [round, setRound] =
    useState(1);

  const [totalRounds, setTotalRounds] =
    useState(3);

  const [timeLeft, setTimeLeft] =
    useState(60);

  const [winner, setWinner] =
    useState(null);

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentWord("");
    setCurrentHint("");
    setCurrentDrawer("");
    setRound(1);
    setTimeLeft(60);
    setWinner(null);
  };

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        setGameStarted,

        gameEnded,
        setGameEnded,

        currentWord,
        setCurrentWord,

        currentHint,
        setCurrentHint,

        currentDrawer,
        setCurrentDrawer,

        round,
        setRound,

        totalRounds,
        setTotalRounds,

        timeLeft,
        setTimeLeft,

        winner,
        setWinner,

        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context =
    useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGame must be used within GameProvider"
    );
  }

  return context;
};

export default GameContext;