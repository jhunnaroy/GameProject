import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";

const SocketContext =
  createContext();

export const SocketProvider = ({
  children,
}) => {
  const [socket, setSocket] =
    useState(null);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_SERVER_URL,      {
        transports: ["websocket"],
      }
    );

    setSocket(newSocket);

    newSocket.on(
      "connect",
      () => {
        console.log(
          "✅ Socket Connected:",
          newSocket.id
        );
      }
    );

    newSocket.on(
      "disconnect",
      () => {
        console.log(
          "❌ Socket Disconnected"
        );
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket =
  () => {
    const context =
      useContext(
        SocketContext
      );

    if (!context) {
      throw new Error(
        "useSocket must be used inside SocketProvider"
      );
    }

    return context;
  };

export default SocketContext;