import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMissionsData } from '../services/api';

export const fetchMissions = createAsyncThunk('missions/fetchUsers', async () => {
    const response = await fetchMissionsData();
    return response;
});

const initialState = {
    missions: [],
    sortByYear: 'desc',
    expandedMissionIds: [],
};

const missionsSlice = createSlice({
    name: 'mission',
    initialState,
    reducers: {
        setSortByYear: (state, action) => {
            state.sortByYear = action.payload;
        },
        setMissionExpanded: (state, action) => {
            state.expandedMissionIds.push(action.payload);
        },
        setMissionCollapsed: (state, action) => {
            state.expandedMissionIds = state.expandedMissionIds.filter(
                (missionId) => missionId !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMissions.fulfilled, (state, action) => {
                state.missions = action.payload;
            })
            .addCase(fetchMissions.rejected, (state, action) => {
                console.error('Ошибка при получении миссий:', action.error);
            });
    },
});

export const { setSortByYear, setMissionExpanded, setMissionCollapsed } = missionsSlice.actions;

export const selectMissions = (state) => state.mission.missions;
export const selectSortByYear = (state) => state.mission.sortByYear;
export const selectExpandedMissionIds = (state) => state.mission.expandedMissionIds;
export default missionsSlice.reducer;

