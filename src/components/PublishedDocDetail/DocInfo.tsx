// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { convertSecsToDate } from "src/utils/utils";

interface PublishedDocDetailBoxProps {
  number: string;
  name: string;
  docType: string;
  publisher: string;
  publishedDate: number;
  resourceUri: string;
  contentHash: string;
}

export default function PublishedDocDetailBox(docDetail: PublishedDocDetailBoxProps) {
  return (
    <Box
      sx={{
        flexBasis: "70%",
        px: 2,
        border: "1px solid",
        borderColor: grey[400],
        borderRadius: 4,
      }}
    >
      <TextField
        label="Document No."
        value={docDetail.number}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Document Name"
        value={docDetail.name}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        multiline
        maxRows={3}
        sx={{ my: 2 }}
      />
      <TextField
        label="Document Type"
        value={docDetail.docType}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Publisher"
        value={docDetail.publisher}
        fullWidth
        variant="standard"
        InputProps={{
          readOnly: true,
        }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Published Date"
        value={convertSecsToDate(docDetail.publishedDate)}
        fullWidth
        variant="standard"
        InputProps={{
          readOnly: true,
        }}
        sx={{ my: 2 }}
      />
      <TextField
        label="Document Hash"
        value={docDetail.contentHash}
        fullWidth
        variant="standard"
        InputProps={{ readOnly: true }}
        sx={{ my: 2 }}
      />
    </Box>
  );
}
