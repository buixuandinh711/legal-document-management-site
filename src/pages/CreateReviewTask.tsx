import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DraftDetailBox from "src/components/DraftDetailBox";
import SelectSigner from "src/components/SelectSigner";
import {
  useCreateReviewTaskMutation,
  useDraftDetailQuery,
  usePublishableDraftQuery,
} from "src/context/slices/apiSlice";
import { openSnackbar } from "src/context/slices/snackbarSlide";
import { useAppDispatch, useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";

export default function CreateReviewTask() {
  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const publishableDraftQuery = usePublishableDraftQuery(
    {
      divisionOnchainId,
      positionIndex,
    },
    {
      skip: divisionOnchainId === "",
    }
  );
  const [selectedDraft, setSelectedDraft] = useState<string>("");
  const [selectedSigners, setSelectedSigners] = useState<string[]>([]);
  const [createReviewTask] = useCreateReviewTaskMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const parsedDraftId = parseInt(selectedDraft);
  const draftDetailQuery = useDraftDetailQuery(
    {
      divisionOnchainId,
      positionIndex,
      draftId: parsedDraftId,
    },
    {
      skip: isNaN(parsedDraftId),
    }
  );

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
              my: 2,
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
        </Paper>
        {selectedDraft !== "" && !isNaN(parseInt(selectedDraft)) && (
          <>
            <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, p: 4, my: 4 }}>
              {draftDetailQuery.isSuccess && (
                <DraftDetailBox
                  id={draftDetailQuery.data.id}
                  name={draftDetailQuery.data.name}
                  documentNo={draftDetailQuery.data.documentNo}
                  documentName={draftDetailQuery.data.documentName}
                  documentType={draftDetailQuery.data.documentType}
                  fileName={draftDetailQuery.data.fileName}
                  updatedAt={draftDetailQuery.data.updatedAt}
                  docUri={draftDetailQuery.data.docUri}
                  drafterUsername={draftDetailQuery.data.drafterUsername}
                  drafterName={draftDetailQuery.data.drafterName}
                />
              )}
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
                    dispatch(openSnackbar({ type: "success", message: "Review task created" }));
                    navigate("/assign-reviewing");
                    console.log("Review task created");
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
                    Create
                  </Button>
                </Box>
              </form>
            </Paper>
          </>
        )}
      </>
    );
  }

  return <ContentError />;
}
