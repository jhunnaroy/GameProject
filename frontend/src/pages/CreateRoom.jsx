import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateRoom = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hostName: "",
    maxPlayers: 8,
    rounds: 3,
    drawTime: 60,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createRoomHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:7000/api/rooms/create",
        {
          hostName: formData.hostName,
          settings: {
            maxPlayers: Number(formData.maxPlayers),
            rounds: Number(formData.rounds),
            drawTime: Number(formData.drawTime),
          },
        }
      );

      localStorage.setItem(
        "playerName",
        formData.hostName
      );

      navigate(`/lobby/${data.room.roomCode}`);

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create room"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">

        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
          Create Room
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Create a new game room and invite your friends
        </p>

        <form
          onSubmit={createRoomHandler}
          className="space-y-5"
        >
          {/* Host Name */}
          <div>
            <label className="block text-gray-300 mb-2">
              Your Name
            </label>

            <input
              type="text"
              name="hostName"
              value={formData.hostName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white outline-none border border-slate-600 focus:border-blue-500"
            />
          </div>

          {/* Max Players */}
          <div>
            <label className="block text-gray-300 mb-2">
              Max Players
            </label>

            <select
              name="maxPlayers"
              value={formData.maxPlayers}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600"
            >
              {[2,3,4,5,6,7,8,9,10].map((num) => (
                <option key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Rounds */}
          <div>
            <label className="block text-gray-300 mb-2">
              Number of Rounds
            </label>

            <select
              name="rounds"
              value={formData.rounds}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600"
            >
              {[1,2,3,4,5].map((num) => (
                <option key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Draw Time */}
          <div>
            <label className="block text-gray-300 mb-2">
              Draw Time (Seconds)
            </label>

            <select
              name="drawTime"
              value={formData.drawTime}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600"
            >
              {[30,60,90,120].map((time) => (
                <option key={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold"
          >
            {loading
              ? "Creating Room..."
              : "Create Room"}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition text-white"
          >
            Back To Home
          </button>
        </form>

      </div>

    </div>
  );
};

export default CreateRoom;