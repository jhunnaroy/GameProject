import {
  getRandomWordsService,
  startGameService,
  endRoundService,
  nextRoundService,
  getLeaderboardService,
} from "../services/gameService.js";


// Get Random Words For Drawer
export const getRandomWords = async (req, res) => {
  try {

    const words = await getRandomWordsService();

    res.status(200).json({
      success: true,
      words,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Start Game
export const startGame = async (req, res) => {
  try {

    const { roomCode } = req.body;

    if (!roomCode) {
      return res.status(400).json({
        success: false,
        message: "Room code is required",
      });
    }

    const room = await startGameService(roomCode);

    res.status(200).json({
      success: true,
      room,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


// End Current Round
export const endRound = async (req, res) => {
  try {

    const { roomCode } = req.body;

    const room = await endRoundService(roomCode);

    res.status(200).json({
      success: true,
      room,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


// Move To Next Round
export const nextRound = async (req, res) => {
  try {

    const { roomCode } = req.body;

    const room = await nextRoundService(roomCode);

    res.status(200).json({
      success: true,
      room,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


// Get Leaderboard
export const getLeaderboard = async (req, res) => {
  try {

    const { roomCode } = req.params;

    const leaderboard =
      await getLeaderboardService(roomCode);

    res.status(200).json({
      success: true,
      leaderboard,
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};