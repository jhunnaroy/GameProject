import { configureStore } from "@reduxjs/toolkit";

import roomReducer from "./roomSlice";
import gameReducer from "./gameSlice";

const store = configureStore({
  reducer: {
    room: roomReducer,
    game: gameReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools:
    import.meta.env.MODE !== "production",
});

export default store;