import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import PublishDraftDetail from "src/components/PublishDocument/PublishDraftDetail";
import SelectSigner from "src/components/SelectSigner";
import { useCreateReviewTaskMutation, usePublishableDraftQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";

export default function RequestSignature() {
  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const publishableDraftQuery = usePublishableDraftQuery({
    divisionOnchainId,
    positionIndex,
  });
  const [selectedDraft, setSelectedDraft] = useState<string>("");
  const [selectedSigners, setSelectedSigners] = useState<string[]>([]);
  const [createReviewTask] = useCreateReviewTaskMutation();

  if (publishableDraftQuery.isLoading) {
    return <ContentLoading />;
  }

  if (publishableDraftQuery.isSuccess) {
    const publishableDrafts = publishableDraftQuery.data;
    return (
      <>
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, py: 2, px: 4 }}>
          <Typography variant="h6" id="tableTitle" component="div" fontWeight={600} fontSize={25}>
            Create Review Task
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
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const extractedSigners = selectedSigners.map((s) => {
                    const [signerAddress, positionIndex] = s.split("/");
                    return {
                      signerAddress,
                      positionIndex: parseInt(positionIndex),
                    };
                  });
                  const parsedDraftId = parseInt(selectedDraft);
                  if (isNaN(parsedDraftId)) return;
                  try {
                    await createReviewTask({
                      divisionOnchainId,
                      positionIndex,
                      draftId: parsedDraftId,
                      assignees: extractedSigners,
                    }).unwrap();
                    console.log("Task created");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <SelectSigner
                  draftId={parseInt(selectedDraft)}
                  selectedSigners={selectedSigners}
                  setSelectedSigners={setSelectedSigners}
                />
                <Box sx={{ mt: 4, display: "flex", justifyContent: "right", gap: 1 }}>
                  <Button variant="outlined" onClick={() => setSelectedDraft("")}>
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    Publish
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Paper>
      </>
    );
  }

  return <ContentError />;
}
