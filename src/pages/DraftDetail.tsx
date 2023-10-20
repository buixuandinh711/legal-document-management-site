import { AttachFile, Edit, Send } from "@mui/icons-material"; // Import the Edit icon
import {
  Typography,
  Paper,
  Box,
  Button,
  InputLabel,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDraftDetailQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";
import { convertSecsToDateTime } from "src/utils/utils";

export default function TaskDetail() {
  const [isEditing, setEditing] = useState(false);
  const { id } = useParams();
  console.log({ id });

  const workingPosition = useAppSelector((state) => state.position);
  const draftDetailQuery = useDraftDetailQuery(
    {
      divisionOnchainId: workingPosition.divisionOnchainId,
      positionIndex: workingPosition.positionIndex,
      draftId: Number.parseInt(id!),
    },
    { skip: id === undefined || isNaN(Number(id)) }
  );

  if (draftDetailQuery.isLoading) {
    return <ContentLoading />;
  }

  if (draftDetailQuery.isError) {
    return <ContentError />;
  }

  return (
    draftDetailQuery.isSuccess && (
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
          <Typography variant="h6" id="tableTitle" component="div" fontWeight={600} fontSize={25}>
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
        {draftDetailQuery.isSuccess && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Name"
              value={draftDetailQuery.data.name}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: !isEditing }}
              sx={{ my: 2 }}
            />
            <TextField
              label="Document No."
              value={draftDetailQuery.data.documentNo}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: !isEditing }}
              sx={{ my: 2 }}
            />
            <TextField
              label="Document Name"
              value={draftDetailQuery.data.documentName}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: !isEditing }}
              multiline
              maxRows={3}
              sx={{ my: 2 }}
            />
            {!isEditing ? (
              <TextField
                label="Document Type"
                value={draftDetailQuery.data.documentType}
                InputProps={{ readOnly: !isEditing }}
                fullWidth
                variant="standard"
                sx={{ my: 2 }}
              />
            ) : (
              <TextField
                fullWidth
                variant="standard"
                sx={{ my: 2 }}
                select
                required
                label="Document Type"
                id="documentType"
                name="documentType"
                autoComplete="documentType"
                value={"1"}
              >
                <MenuItem value="1">{"Bo Luat"}</MenuItem>
              </TextField>
            )}
            <TextField
              label="Drafter"
              value={draftDetailQuery.data.drafterName}
              fullWidth
              variant="standard"
              InputProps={{
                readOnly: true,
                disabled: true,
              }}
              sx={{ my: 2 }}
            />
            <TextField
              label="Last Updated"
              value={convertSecsToDateTime(draftDetailQuery.data.updatedAt)}
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
        )}

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
          <Button variant="contained" endIcon={<Send />} sx={{ width: "120px" }}>
            Submit
          </Button>
        </Box>
      </Paper>
    )
  );
}
