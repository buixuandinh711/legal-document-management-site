import { AttachFile } from "@mui/icons-material";
import { Box, Chip, InputLabel, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function SubmitDraftDetail() {
  return (
    <Box
      sx={{
        flexBasis: "70%",
        mt: 2,
        px: 2,
        border: "1px solid",
        borderColor: grey[400],
        borderRadius: 4,
      }}
    >
      <TextField
        label="Document No."
        value={"NDCP/2019/1"}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Document Name"
        value={"LUẬT THỰC HIỆN DÂN CHỦ Ở CƠ SỞ"}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        multiline
        maxRows={3}
        sx={{ my: 2 }}
      />
      <TextField
        label="Document Type"
        value={"Luat"}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Drafter"
        value={"Bui Xuan Dinh"}
        fullWidth
        variant="standard"
        InputProps={{
          readOnly: true,
          disabled: true,
        }}
        sx={{ my: 2 }}
      />
      <Box sx={{ my: 2 }}>
        <InputLabel sx={{ transform: "scale(0.75)", mb: 1 }}>Document Content</InputLabel>
        <Chip
          label={"Constitutional Law.pdf"}
          icon={<AttachFile />}
          variant="outlined"
          sx={{ maxWidth: 300, cursor: "pointer" }}
          onClick={() => {}}
        />
      </Box>
    </Box>
  );
}
