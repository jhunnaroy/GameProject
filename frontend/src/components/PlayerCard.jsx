const PlayerCard = ({
  player,
}) => {
  return (
    <div className="bg-slate-700 rounded-xl p-4 hover:bg-slate-600 transition">

      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-white font-semibold text-lg">
            {player.name}
          </h3>

          <div className="flex flex-wrap gap-2 mt-2">

            {player.isHost && (
              <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-md font-semibold">
                👑 Host
              </span>
            )}

            {player.isDrawer && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
                🎨 Drawer
              </span>
            )}

            {player.guessedCorrectly && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
                ✅ Correct
              </span>
            )}

          </div>

        </div>

        <div className="text-right">

          <p className="text-green-400 font-bold text-xl">
            {player.score}
          </p>

          <p className="text-gray-300 text-sm">
            Points
          </p>

        </div>

      </div>

    </div>
  );
};

export default PlayerCard;