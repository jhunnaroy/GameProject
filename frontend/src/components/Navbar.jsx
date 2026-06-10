import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";

const Navbar = ({
  roomCode,
  playerName,
}) => {
  const navigate = useNavigate();

  const copyRoomCode = () => {
    navigator.clipboard.writeText(
      roomCode
    );

    alert("Room Code Copied!");
  };

  const leaveRoom = () => {
    localStorage.removeItem(
      "playerName"
    );

    navigate("/");
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-4 py-3">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <span className="text-3xl">
            🎨
          </span>

          <h1 className="text-white text-2xl font-bold">
            Skribbl Clone
          </h1>

        </div>

        {/* Room Info */}
        <div className="flex items-center gap-3 bg-slate-700 px-4 py-2 rounded-lg">

          <span className="text-gray-300">
            Room:
          </span>

          <span className="font-bold text-green-400 tracking-widest">
            {roomCode}
          </span>

          <button
            onClick={copyRoomCode}
            className="text-blue-400 hover:text-blue-300"
          >
            <FaCopy />
          </button>

        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">

          <div className="bg-slate-700 px-4 py-2 rounded-lg">

            <span className="text-gray-300">
              Player:
            </span>

            <span className="ml-2 font-semibold text-white">
              {playerName}
            </span>

          </div>

          <button
            onClick={leaveRoom}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-medium transition"
          >
            Leave
          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;