import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const playerName =
    localStorage.getItem("playerName") || "";

  const roomCode =
    localStorage.getItem("roomCode") || "";

  return (
    <div className="min-h-screen bg-slate-900">

      {/* Navbar */}
      <Navbar
        roomCode={roomCode}
        playerName={playerName}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-5">

        <Outlet />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-auto py-4">

        <div className="text-center text-gray-400 text-sm">

          © {new Date().getFullYear()}
          {" "}
          Skribbl Clone

        </div>

      </footer>

    </div>
  );
};

export default MainLayout;