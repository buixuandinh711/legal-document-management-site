import { Box, Typography } from "@mui/material";
import { RemoveCircle as InProgressIcon, CheckCircle as DoneIcon } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const statusTextStyles = {
  fontWeight: 600,
  fontSize: "0.9rem",
  color: grey[700],
};

type DraftingTaskStatus = "Hoàn thành" | "Đang thực hiện";

export default function DisplayedDraftingTaskStatus({ status }: { status: DraftingTaskStatus }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {(() => {
        if (status === "Đang thực hiện") {
          return (
            <>
              <InProgressIcon fontSize="small" color="primary" />
              <Typography {...statusTextStyles}>Đang thực hiện</Typography>
            </>
          );
        }
        if (status === "Hoàn thành") {
          return (
            <>
              <DoneIcon fontSize="small" color="success" />
              <Typography {...statusTextStyles}>Đã nộp</Typography>
            </>
          );
        }
      })()}
    </Box>
  );
}
