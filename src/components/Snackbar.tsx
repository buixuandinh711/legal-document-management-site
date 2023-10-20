import { Alert } from "@mui/material";
import MuiSnackbar from "@mui/material/Snackbar";
import { closeSnackbar } from "src/context/slices/snackbarSlide";
import { useAppDispatch, useAppSelector } from "src/context/store";

export default function Snackbar() {
  const snackbarState = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeSnackbar);
  };

  return (
    <MuiSnackbar open={snackbarState.open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={snackbarState.type} sx={{ width: "100%" }}>
        {snackbarState.message}
      </Alert>
    </MuiSnackbar>
  );
}
