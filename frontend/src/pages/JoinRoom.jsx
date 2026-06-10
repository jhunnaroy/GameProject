import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JoinRoom = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    playerName: "",
    roomCode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const joinRoomHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:7000/api/rooms/join",
        {
          roomCode: formData.roomCode.toUpperCase(),
          playerName: formData.playerName,
        }
      );

      // localStorage.setItem(
      //   "playerName",
      //   formData.playerName
      // );

      // navigate(
      //   `/lobby/${data.room.roomCode}`
      // );
  localStorage.setItem(
  "playerName",
  formData.playerName
);

navigate(
  `/lobby/${data.room.roomCode}`,
  {
    state: {
      playerName:
        formData.playerName,
    },
  }
);

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to join room"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">

        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
          Join Room
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Enter your room code and start playing
        </p>

        <form
          onSubmit={joinRoomHandler}
          className="space-y-5"
        >

          {/* Player Name */}
          <div>
            <label className="block text-gray-300 mb-2">
              Your Name
            </label>

            <input
              type="text"
              name="playerName"
              value={formData.playerName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-green-500 outline-none"
            />
          </div>

          {/* Room Code */}
          <div>
            <label className="block text-gray-300 mb-2">
              Room Code
            </label>

            <input
              type="text"
              name="roomCode"
              value={formData.roomCode}
              onChange={handleChange}
              placeholder="Enter Room Code"
              required
              className="w-full px-4 py-3 uppercase rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-green-500 outline-none"
            />
          </div>

          {/* Join Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            {loading
              ? "Joining Room..."
              : "Join Room"}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
          >
            Back To Home
          </button>

        </form>

      </div>

    </div>
  );
};

export default JoinRoom;