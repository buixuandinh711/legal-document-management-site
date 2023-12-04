import { Box, Button, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DisplayedDraftingTaskStatus from "src/components/DisplayedDraftingTaskStatus";
import DocumentContexBox from "src/components/DocumentContexBox";
import DraftDetailBox from "src/components/DraftDetailBox";
import SubmitDraftTaskDialog from "src/components/DraftingTaskDetail/SubmitDraftTaskDialog";
import {
  useAssignedDraftingTaskDetailQuery,
  useDraftDetailQuery,
  usePublishableDraftQuery,
} from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";
import { convertSecsToDateTime } from "src/utils/utils";

export default function DraftingTaskDetail() {
  const { id: taskId } = useParams();
  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const taskDetailQuery = useAssignedDraftingTaskDetailQuery(
    {
      divisionOnchainId,
      positionIndex,
      taskId: parseInt(taskId!),
    },
    {
      skip: taskId === undefined || isNaN(parseInt(taskId)),
    }
  );

  const publishableDraftsQuery = usePublishableDraftQuery(
    { divisionOnchainId, positionIndex },
    { skip: !taskDetailQuery.isSuccess || taskDetailQuery.data.draftId !== null }
  );

  const [selectedDraft, setSelectedDraft] = useState<string>("");
  const parsedDraftId = parseInt(selectedDraft);
  const draftDetailQuery = useDraftDetailQuery(
    {
      divisionOnchainId,
      positionIndex,
      draftId:
        taskDetailQuery.isSuccess && taskDetailQuery.data.draftId !== null
          ? taskDetailQuery.data.draftId
          : parsedDraftId,
    },
    {
      skip:
        taskDetailQuery.isSuccess && taskDetailQuery.data.draftId === null && isNaN(parsedDraftId),
    }
  );
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  if (taskId === undefined || isNaN(parseInt(taskId!))) {
    return <ContentError />;
  }

  if (taskDetailQuery.isLoading) {
    return <ContentLoading />;
  }

  if (taskDetailQuery.isSuccess) {
    const taskDetail = taskDetailQuery.data;
    return (
      <>
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, py: 4, px: 4 }}>
          <Typography variant="h6" id="tableTitle" component="div" fontWeight={600} fontSize={25}>
            Chi tiết công việc
          </Typography>
          <Box
            sx={{
              px: 2,
              border: "1px solid",
              borderColor: grey[400],
              borderRadius: 4,
              my: 2,
            }}
          >
            <TextField
              label="Tên công việc"
              value={taskDetail.name}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: true }}
              sx={{ my: 2 }}
            />
            <TextField
              label="Người giao"
              value={`${taskDetail.assigner} - ${taskDetail.assignerPosition}`}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: true }}
              multiline
              maxRows={3}
              sx={{ my: 2 }}
            />
            <TextField
              label="Thời điểm được giao"
              value={convertSecsToDateTime(taskDetail.assignedAt)}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: true }}
              sx={{ my: 2 }}
            />
            <Box sx={{ my: 2 }}>
              <InputLabel sx={{ transform: "scale(0.75)" }}>Trạng thái</InputLabel>
              <DisplayedDraftingTaskStatus
                status={taskDetail.draftId !== null ? "Hoàn thành" : "Đang thực hiện"}
              />
            </Box>
          </Box>
          {taskDetail.draftId === null && publishableDraftsQuery.isSuccess && (
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
              {publishableDraftsQuery.data.map((draft) => (
                <MenuItem key={draft.id} value={`${draft.id}`}>
                  {draft.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          {taskDetail.draftId === null && !isNaN(parsedDraftId) && (
            <Box sx={{ my: 2, display: "flex", justifyContent: "right", gap: 1 }}>
              <Button variant="contained" onClick={() => setOpenSubmitDialog(true)}>
                Nộp bản thảo
              </Button>
            </Box>
          )}
        </Paper>
        {draftDetailQuery.isSuccess && (
          <>
            <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, p: 4, mt: 4 }}>
              <DraftDetailBox
                id={draftDetailQuery.data.id}
                name={draftDetailQuery.data.name}
                documentNo={draftDetailQuery.data.documentNo}
                documentName={draftDetailQuery.data.documentName}
                documentType={draftDetailQuery.data.documentType}
                fileName={draftDetailQuery.data.fileName}
                updatedAt={draftDetailQuery.data.updatedAt}
                docUri={draftDetailQuery.data.docUri}
                drafterName={draftDetailQuery.data.drafterName}
                drafterPos={draftDetailQuery.data.drafterPos}
              />
            </Paper>
            <DocumentContexBox documentUri={draftDetailQuery.data.docUri} />
          </>
        )}
        {taskDetail.draftId === null &&
          !isNaN(parsedDraftId) &&
          draftDetailQuery.isSuccess &&
          openSubmitDialog && (
            <SubmitDraftTaskDialog
              open={openSubmitDialog}
              handleClose={() => {
                setOpenSubmitDialog(false);
              }}
              draftDetail={draftDetailQuery.data}
              taskId={parseInt(taskId)}
            />
          )}
      </>
    );
  }

  return <ContentError />;
}
