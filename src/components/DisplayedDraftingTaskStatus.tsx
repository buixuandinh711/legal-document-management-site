import { Box, Typography } from "@mui/material";
import { RemoveCircle as InProgressIcon, CheckCircle as DoneIcon } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const statusTextStyles = {
  fontWeight: 600,
  fontSize: "0.9rem",
  color: grey[700],
};

type DraftingTaskStatus = "Done" | "In-Progress";

export default function DisplayedDraftingTaskStatus({ status }: { status: DraftingTaskStatus }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {(() => {
        if (status === "In-Progress") {
          return (
            <>
              <InProgressIcon fontSize="small" color="primary" />
              <Typography {...statusTextStyles}>In-Progress</Typography>
            </>
          );
        }
        if (status === "Done") {
          return (
            <>
              <DoneIcon fontSize="small" color="success" />
              <Typography {...statusTextStyles}>Submitted</Typography>
            </>
          );
        }
      })()}
    </Box>
  );
}
