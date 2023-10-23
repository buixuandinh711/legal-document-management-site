import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import SubmitDraftContent from "src/components/SubmitDocument/SubmitDraftContent";
import SubmitDraftDetail from "src/components/SubmitDocument/SubmitDraftDetail";
import SubmitSigner from "src/components/SubmitDocument/SubmitSigner";
import { useSubmittableDraftQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";

export default function SubmitDocument() {
  const workingPosition = useAppSelector((state) => state.position);
  const submittableDraftQuery = useSubmittableDraftQuery({
    divisionOnchainId: workingPosition.divisionOnchainId,
    positionIndex: workingPosition.positionIndex,
  });
  const [selectedDraft, setSelectedDraft] = useState<string>("");

  if (submittableDraftQuery.isLoading) {
    return <ContentLoading />;
  }

  if (submittableDraftQuery.isSuccess) {
    const submittableDrafts = submittableDraftQuery.data;
    return (
      <>
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, py: 2, px: 4 }}>
          <Typography variant="h6" id="tableTitle" component="div" fontWeight={600} fontSize={25}>
            Submit Draft
          </Typography>
          <TextField
            select
            fullWidth
            label="Draft"
            variant="outlined"
            value={selectedDraft}
            onChange={(value) => {
              setSelectedDraft(value.target.value);
            }}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
              },
            }}
          >
            {submittableDrafts.map((draft) => (
              <MenuItem key={draft.id} value={`${draft.id}`}>
                {draft.name}
              </MenuItem>
            ))}
          </TextField>
          {selectedDraft !== "" && !isNaN(parseInt(selectedDraft)) && (
            <>
              <Box sx={{ display: "flex", gap: 2, alignItems: "stretch", maxHeight: "450px" }}>
                <SubmitDraftDetail draftId={selectedDraft} />
                <SubmitSigner draftId={selectedDraft} />
              </Box>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "right", gap: 1 }}>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained">Submit</Button>
              </Box>
            </>
          )}
        </Paper>
        {selectedDraft !== "" && !isNaN(parseInt(selectedDraft)) && (
          <SubmitDraftContent draftId={selectedDraft} />
        )}
      </>
    );
  }

  return <ContentError />;
}
