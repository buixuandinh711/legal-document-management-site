import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import PublishDraftDetail from "src/components/PublishDocument/PublishDraftDetail";
import SelectSigner from "src/components/SelectSigner";
import { usePublishableDraftQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";

export default function RequestSignature() {
  const workingPosition = useAppSelector((state) => state.position);
  const publishableDraftQuery = usePublishableDraftQuery({
    divisionOnchainId: workingPosition.divisionOnchainId,
    positionIndex: workingPosition.positionIndex,
  });
  const [selectedDraft, setSelectedDraft] = useState<string>("");

  if (publishableDraftQuery.isLoading) {
    return <ContentLoading />;
  }

  if (publishableDraftQuery.isSuccess) {
    const publishableDrafts = publishableDraftQuery.data;
    return (
      <>
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, py: 2, px: 4 }}>
          <Typography variant="h6" id="tableTitle" component="div" fontWeight={600} fontSize={25}>
            Publish Draft
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
            {publishableDrafts.map((draft) => (
              <MenuItem key={draft.id} value={`${draft.id}`}>
                {draft.name}
              </MenuItem>
            ))}
          </TextField>
          {selectedDraft !== "" && !isNaN(parseInt(selectedDraft)) && (
            <>
              <PublishDraftDetail draftId={selectedDraft} />
              <SelectSigner />
              <Box sx={{ mt: 4, display: "flex", justifyContent: "right", gap: 1 }}>
                <Button variant="outlined" onClick={() => setSelectedDraft("")}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => {}}>
                  Publish
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </>
    );
  }

  return <ContentError />;
}
