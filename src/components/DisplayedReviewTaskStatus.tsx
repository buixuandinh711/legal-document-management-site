import { Box, Typography } from "@mui/material";
import {
  RemoveCircle as InProgressIcon,
  CheckCircle as SignedIcon,
  Cancel as RejectedIcon,
} from "@mui/icons-material";
import { ReviewTaskStatus } from "src/context/slices/apiSlice";
import { grey } from "@mui/material/colors";

const statusTextStyles = {
  fontWeight: 600,
  fontSize: "0.9rem",
  color: grey[700],
};

export default function DisplayedReviewTaskStatus({ status }: { status: ReviewTaskStatus }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {(() => {
        if (status === ReviewTaskStatus.InProgress) {
          return (
            <>
              <InProgressIcon fontSize="small" color="primary" />
              <Typography {...statusTextStyles}>Đang thực hiện</Typography>
            </>
          );
        }
        if (status === ReviewTaskStatus.Signed) {
          return (
            <>
              <SignedIcon fontSize="small" color="success" />
              <Typography {...statusTextStyles}>Đã ký</Typography>
            </>
          );
        }
        if (status === ReviewTaskStatus.Rejected) {
          return (
            <>
              <RejectedIcon fontSize="small" color="error" />
              <Typography {...statusTextStyles}>Từ chối</Typography>
            </>
          );
        }
      })()}
    </Box>
  );
}
