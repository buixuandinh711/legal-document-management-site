import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import SubmitDraftDetail from "src/components/SelectSubmittedDraft/SubmitDraftDetail";
import SubmitSigner from "src/components/SelectSubmittedDraft/SubmitSigner";

export default function SelectSubmittedDraft() {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, py: 2, px: 4 }}>
      <Typography variant="h6" id="tableTitle" component="div" fontWeight={600} fontSize={25}>
        Submit Draft
      </Typography>
      <TextField
        select
        fullWidth
        label="Draft"
        variant="outlined"
        value={"1"}
        sx={{
          mt: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
          },
        }}
      >
        <MenuItem value={"1"}>Luat Rua Tien Draft</MenuItem>
      </TextField>
      <Box sx={{ display: "flex", gap: 2 }}>
        <SubmitDraftDetail />
        <SubmitSigner />
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "right", gap: 1 }}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Submit</Button>
      </Box>
    </Paper>
  );
}
