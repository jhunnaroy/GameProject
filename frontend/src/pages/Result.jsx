import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();

  const leaderboard = [
    {
      name: "Jhunna",
      score: 450,
    },
    {
      name: "Rahul",
      score: 320,
    },
    {
      name: "Aman",
      score: 250,
    },
    {
      name: "Rohit",
      score: 180,
    },
  ];

  const winner = leaderboard[0];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-4xl bg-slate-800 rounded-3xl p-6 md:p-10 shadow-xl">

        {/* Winner Section */}
        <div className="text-center mb-10">

          <div className="text-6xl mb-4">
            🏆
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Game Finished
          </h1>

          <p className="text-gray-400 mt-3">
            Congratulations to the winner
          </p>

          <div className="mt-6 bg-yellow-500 text-black rounded-2xl p-5 inline-block">

            <h2 className="text-2xl font-bold">
              {winner.name}
            </h2>

            <p className="font-semibold">
              {winner.score} Points
            </p>

          </div>

        </div>

        {/* Leaderboard */}
        <div>

          <h2 className="text-2xl font-bold mb-5 text-center">
            Leaderboard
          </h2>

          <div className="space-y-4">

            {leaderboard.map(
              (player, index) => (
                <div
                  key={index}
                  className="bg-slate-700 rounded-xl p-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">

                    <div className="text-2xl font-bold">

                      {index === 0 && "🥇"}
                      {index === 1 && "🥈"}
                      {index === 2 && "🥉"}
                      {index > 2 &&
                        `#${index + 1}`}

                    </div>

                    <div>

                      <h3 className="font-semibold text-lg">
                        {player.name}
                      </h3>

                    </div>

                  </div>

                  <div className="font-bold text-yellow-400">
                    {player.score} pts
                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col md:flex-row gap-4">

          <button
            onClick={() =>
              navigate("/create-room")
            }
            className="flex-1 bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold text-lg transition"
          >
            Play Again
          </button>

          <button
            onClick={() =>
              navigate("/")
            }
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg transition"
          >
            Back To Home
          </button>

        </div>

      </div>

    </div>
  );
};

export default Result;