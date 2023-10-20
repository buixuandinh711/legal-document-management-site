import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SnackbarState {
  type: "error" | "warning" | "info" | "success";
  open: boolean;
  message: string;
}

const initialState: SnackbarState = {
  type: "info",
  open: false,
  message: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (
      state,
      action: PayloadAction<{ type: "error" | "warning" | "info" | "success"; message: string }>
    ) => {
      state.open = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    closeSnackbar: (state, action) => {
      state.open = false;
      state.type = "info";
      state.message = "";
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
