import { AttachFile } from "@mui/icons-material";
import { Box, Chip, InputLabel, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

interface DraftDetailBoxProps {
  id: number;
  name: string;
  documentNo: string;
  documentName: string;
  documentType: string;
  fileName: string;
  updatedAt: number;
  docUri: string;
  drafterUsername: string;
  drafterName: string;
}

export default function DraftDetailBox(draftDetail: DraftDetailBoxProps) {
  return (
    <Box
      sx={{
        px: 2,
        border: "1px solid",
        borderColor: grey[400],
        borderRadius: 4,
      }}
    >
      <TextField
        label="Document No."
        value={draftDetail.documentNo}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Document Name"
        value={draftDetail.documentName}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        multiline
        maxRows={3}
        sx={{ my: 2 }}
      />
      <TextField
        label="Document Type"
        value={draftDetail.documentType}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Drafter"
        value={draftDetail.drafterName}
        fullWidth
        variant="standard"
        InputProps={{
          readOnly: true,
        }}
        sx={{ my: 2 }}
      />
      <Box sx={{ my: 2 }}>
        <InputLabel sx={{ transform: "scale(0.75)", mb: 1 }}>Document Content</InputLabel>
        <Chip
          label={draftDetail.fileName}
          icon={<AttachFile />}
          variant="outlined"
          sx={{ maxWidth: 300, cursor: "pointer" }}
          onClick={() => {
            window.open(draftDetail.docUri, "_blank");
          }}
        />
      </Box>
    </Box>
  );
}
