import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WorkingPosition {
  divisionId: number;
  positionIndex: number;
  positionRole: number;
}

const initialState: WorkingPosition = {
  divisionId: 0,
  positionIndex: 0,
  positionRole: 0,
};

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    switchPosition: (state, action: PayloadAction<WorkingPosition>) => {
      state.divisionId = action.payload.divisionId;
      state.positionIndex = action.payload.positionIndex;
      state.positionRole = action.payload.positionRole;
    },
  },
});

export const { switchPosition } = positionSlice.actions;
