import { AttachFile } from "@mui/icons-material";
import { Box, Chip, InputLabel, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useDraftDetailQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";

export default function PublishDraftDetail({ draftId }: { draftId: string }) {
  const parsedId = parseInt(draftId);
  const workingPosition = useAppSelector((state) => state.position);
  const draftDetailQuery = useDraftDetailQuery(
    {
      divisionOnchainId: workingPosition.divisionOnchainId,
      positionIndex: workingPosition.positionIndex,
      draftId: parsedId,
    },
    {
      skip: isNaN(parsedId),
    }
  );

  if (draftDetailQuery.isLoading) {
    return <ContentLoading />;
  }

  if (draftDetailQuery.isSuccess) {
    const draftDetail = draftDetailQuery.data;
    return (
      <Box
        sx={{
          mt: 4,
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

  return <ContentError />;
}
