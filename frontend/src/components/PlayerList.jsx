import PlayerCard from "./PlayerCard";

const PlayerList = ({
  players = [],
}) => {
  return (
    <div className="bg-slate-800 rounded-xl p-4">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-white text-xl font-bold">
          Players
        </h2>

        <span className="bg-slate-700 text-white px-3 py-1 rounded-lg">
          {players.length}
        </span>

      </div>

      {players.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">
            No Players Joined Yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">

          {players.map(
            (player, index) => (
              <PlayerCard
                key={
                  player._id ||
                  player.name ||
                  index
                }
                player={player}
              />
            )
          )}

        </div>
      )}

    </div>
  );
};

export default PlayerList;