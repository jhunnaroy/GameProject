import {
  createContext,
  useContext,
  useState,
} from "react";

const RoomContext =
  createContext();

export const RoomProvider = ({
  children,
}) => {

  const [roomCode, setRoomCode] =
    useState("");

  const [host, setHost] =
    useState("");

  const [players, setPlayers] =
    useState([]);

  const [settings, setSettings] =
    useState({
      maxPlayers: 8,
      rounds: 3,
      drawTime: 60,
      wordChoices: 3,
      hintsEnabled: true,
    });

  const joinRoom = (
    code,
    player
  ) => {

    setRoomCode(code);

    localStorage.setItem(
      "roomCode",
      code
    );

    if (player) {

      setPlayers((prev) => [
        ...prev,
        player,
      ]);

    }
  };

  const leaveRoom = () => {

    setRoomCode("");
    setHost("");
    setPlayers([]);

    localStorage.removeItem(
      "roomCode"
    );

  };

  const updatePlayers = (
    updatedPlayers
  ) => {

    setPlayers(
      updatedPlayers
    );

  };

  const updateSettings = (
    newSettings
  ) => {

    setSettings(
      (prev) => ({
        ...prev,
        ...newSettings,
      })
    );

  };

  const resetRoom = () => {

    setRoomCode("");
    setHost("");
    setPlayers([]);

    setSettings({
      maxPlayers: 8,
      rounds: 3,
      drawTime: 60,
      wordChoices: 3,
      hintsEnabled: true,
    });

    localStorage.removeItem(
      "roomCode"
    );
  };

  return (
    <RoomContext.Provider
      value={{
        roomCode,
        setRoomCode,

        host,
        setHost,

        players,
        setPlayers,

        settings,
        setSettings,

        joinRoom,
        leaveRoom,
        updatePlayers,
        updateSettings,
        resetRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {

  const context =
    useContext(
      RoomContext
    );

  if (!context) {

    throw new Error(
      "useRoom must be used within RoomProvider"
    );

  }

  return context;
};

export default RoomContext;