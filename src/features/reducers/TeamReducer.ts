import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeam as Team } from "../../models/ITeam";

interface TeamState {
  currentTeam: Team | null;
}

const initialState: TeamState = {
  currentTeam: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam(state, action: PayloadAction<Team>) {
      state.currentTeam = action.payload;
    },
    clearTeam(state) {
      state.currentTeam = null;
    },
  },
});

export const { setTeam, clearTeam } = teamSlice.actions;
export default teamSlice.reducer;
