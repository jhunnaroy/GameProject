import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">

      <h1 className="text-5xl font-bold mb-4">
        Skribbl.io Clone
      </h1>

      <p className="text-gray-400 mb-10">
        Draw, Guess and Have Fun 🎨
      </p>

      <div className="flex gap-5">

        <button
          onClick={() =>
            navigate("/create-room")
          }
          className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Create Room
        </button>

        <button
          onClick={() =>
            navigate("/join-room")
          }
          className="px-8 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          Join Room
        </button>

      </div>

    </div>
  );
};

export default Home;