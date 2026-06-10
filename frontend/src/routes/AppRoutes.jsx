import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import CreateRoom from "../pages/CreateRoom";
import JoinRoom from "../pages/JoinRoom";
import Lobby from "../pages/Lobby";
import GameRoom from "../pages/GameRoom";
import Result from "../pages/Result";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          element={<MainLayout />}
        >
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/create-room"
            element={<CreateRoom />}
          />

          <Route
            path="/join-room"
            element={<JoinRoom />}
          />

          <Route
            path="/lobby/:roomCode"
            element={<Lobby />}
          />

          <Route
            path="/game/:roomCode"
            element={<GameRoom />}
          />

          <Route
            path="/result/:roomCode"
            element={<Result />}
          />
        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;