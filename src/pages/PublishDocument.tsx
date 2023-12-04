import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import DocumentContexBox from "src/components/DocumentContexBox";
import DocumentSignerBox from "src/components/DocumentSignerBox";
import DraftDetailBox from "src/components/DraftDetailBox";
import PublishDocDialog from "src/components/PublishDocument/PublishDocDialog";
import {
  useDraftDetailQuery,
  useDraftSignaturesQuery,
  usePublishableDraftQuery,
} from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";
import { compareAddress } from "src/utils/utils";

export default function PublishDocument() {
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
  const [openDialog, setOpenDialog] = useState(false);
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
  const draftSignaturesQuery = useDraftSignaturesQuery(
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
            Ban hành văn bản
          </Typography>
          <TextField
            select
            fullWidth
            label="Bản thảo"
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
                {draft.name.length < 100 ? draft.name : draft.name.slice(0, 100) + "..."}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
        {selectedDraft !== "" && !isNaN(parseInt(selectedDraft)) && (
          <>
            <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, py: 2, px: 4, my: 4 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "stretch" }}>
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
                {draftSignaturesQuery.isSuccess && (
                  <DocumentSignerBox signers={draftSignaturesQuery.data} />
                )}
              </Box>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "right", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => setSelectedDraft("")}
                  sx={{ minWidth: 120 }}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setOpenDialog(true)}
                  sx={{ minWidth: 120 }}
                >
                  Ban hành
                </Button>
              </Box>
            </Paper>
            {draftDetailQuery.isSuccess && (
              <DocumentContexBox documentUri={draftDetailQuery.data.docUri} />
            )}
            {draftDetailQuery.isSuccess && draftSignaturesQuery.isSuccess && openDialog && (
              <PublishDocDialog
                key={selectedDraft}
                open={openDialog}
                draftDetail={draftDetailQuery.data}
                draftSignatures={[...draftSignaturesQuery.data].sort((sig1, sig2) =>
                  compareAddress(sig1.signerAddress, sig2.signerAddress)
                )}
                handleClose={(resetSelection: boolean) => {
                  setOpenDialog(false);
                  if (resetSelection) {
                    setSelectedDraft("");
                  }
                }}
              />
            )}
          </>
        )}
      </>
    );
  }

  return <ContentError />;
}
