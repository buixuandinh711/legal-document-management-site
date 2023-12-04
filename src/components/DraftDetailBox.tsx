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
  drafterName: string;
  drafterPos: string;
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
        label="Số hiệu"
        value={draftDetail.documentNo}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Tên văn bản"
        value={draftDetail.documentName}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        multiline
        maxRows={3}
        sx={{ my: 2 }}
      />
      <TextField
        label="Loại văn bản"
        value={draftDetail.documentType}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Người soạn thảo"
        value={`${draftDetail.drafterName} - ${draftDetail.drafterPos}`}
        fullWidth
        variant="standard"
        InputProps={{
          readOnly: true,
        }}
        sx={{ my: 2 }}
      />
      <Box sx={{ my: 2 }}>
        <InputLabel sx={{ transform: "scale(0.75)", mb: 1 }}>Nội dung</InputLabel>
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
