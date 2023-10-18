import { Edit, Send } from "@mui/icons-material"; // Import the Edit icon
import {
  Typography,
  Paper,
  Box,
  Button,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import InputFileUpload from "src/components/InputFileUpload";

type DocumentDetail = {
  documentNo: string;
  documentName: string;
  draftName: string;
  documentType: string;
  lastUpdated: string;
};

export default function TaskDetail({
  documentDetail,
}: {
  documentDetail: DocumentDetail;
}) {
  const [isEditing, setEditing] = useState(false);

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          pt: 2,
          pb: 4,
          px: 4,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            fontWeight={600}
            fontSize={25}
          >
            Draft Detail
          </Typography>
          <Button
            variant="text"
            startIcon={<Edit />}
            disabled={isEditing}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              ...(isEditing
                ? {
                    visibility: "hidden",
                    display: "none",
                  }
                : {}),
            }}
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Draft Name"
            value={documentDetail.draftName}
            fullWidth
            variant="standard"
            InputProps={{ readOnly: !isEditing }}
            sx={{ my: 2 }}
          />
          <TextField
            label="Document No."
            value={documentDetail.documentNo}
            fullWidth
            variant="standard"
            InputProps={{ readOnly: !isEditing }}
            sx={{ my: 2 }}
          />
          <TextField
            label="Document Name"
            value={documentDetail.documentName}
            fullWidth
            variant="standard"
            InputProps={{ readOnly: !isEditing }}
            multiline
            maxRows={3}
            sx={{ my: 2 }}
          />
          <TextField
            label="Document Type"
            value={documentDetail.documentType}
            InputProps={{ readOnly: !isEditing }}
            fullWidth
            variant="standard"
            sx={{ my: 2 }}
          />
          <TextField
            label="Last Updated"
            value={documentDetail.lastUpdated}
            fullWidth
            variant="standard"
            InputProps={{
              readOnly: true,
              disabled: true,
            }}
            sx={{ my: 2 }}
          />
          <Box sx={{ my: 2 }}>
            <InputLabel sx={{ transform: "scale(0.75)", mb: 1 }}>
              Document Content
            </InputLabel>
            <InputFileUpload />
          </Box>
        </Box>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "right",
            ...(isEditing
              ? {}
              : {
                  visibility: "hidden",
                  display: "none",
                }),
          }}
        >
          <Button
            variant="outlined"
            sx={{ mr: 1, width: "120px" }}
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            endIcon={<Send />}
            sx={{ width: "120px" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  );
}
