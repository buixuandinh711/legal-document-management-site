import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WorkingPosition {
  divisionOnchainId: string;
  positionIndex: number;
  positionRole: number;
}

const initialState: WorkingPosition = {
  divisionOnchainId: "",
  positionIndex: 0,
  positionRole: 0,
};

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    switchPosition: (state, action: PayloadAction<WorkingPosition>) => {
      state.divisionOnchainId = action.payload.divisionOnchainId;
      state.positionIndex = action.payload.positionIndex;
      state.positionRole = action.payload.positionRole;
    },
  },
});

export const { switchPosition } = positionSlice.actions;
