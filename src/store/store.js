import { configureStore } from "@reduxjs/toolkit";
import missionReducer from './missionsSlice';

export const store = configureStore({
    reducer: {
        mission: missionReducer,
    },
});

