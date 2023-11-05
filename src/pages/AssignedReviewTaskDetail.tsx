import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import DisplayedReviewTaskStatus from "src/components/DisplayedReviewTaskStatus";
import DocumentContexBox from "src/components/DocumentContexBox";
import DraftDetailBox from "src/components/DraftDetailBox";
import { useAssignedReviewTaskDetailQuery, useDraftDetailQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";
import { convertSecsToDateTime } from "src/utils/utils";

export default function AssignedReviewTaskDetail() {
  const { id: taskId } = useParams();

  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);

  const taskDetailQuery = useAssignedReviewTaskDetailQuery(
    {
      divisionOnchainId,
      positionIndex,
      taskId: parseInt(taskId!),
    },
    {
      skip: taskId === undefined || isNaN(parseInt(taskId)),
    }
  );

  const draftDetailQuery = useDraftDetailQuery(
    {
      divisionOnchainId,
      positionIndex,
      draftId: taskDetailQuery.isSuccess ? taskDetailQuery.data.draftId : 0,
    },
    {
      skip: !taskDetailQuery.isSuccess,
    }
  );

  if (taskDetailQuery.isLoading) {
    return <ContentLoading />;
  }

  if (taskDetailQuery.isSuccess) {
    const taskDetail = taskDetailQuery.data;
    return (
      <>
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, py: 4, px: 4 }}>
          <Typography variant="h6" id="tableTitle" component="div" fontWeight={600} fontSize={25}>
            Review Task
          </Typography>
          <Box
            sx={{
              px: 2,
              border: "1px solid",
              borderColor: grey[400],
              borderRadius: 4,
              mt: 2,
            }}
          >
            <TextField
              label="Draft Name"
              value={taskDetail.draftName}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: true }}
              sx={{ my: 2 }}
            />
            <TextField
              label="Assigner"
              value={`${taskDetail.assigner} - ${taskDetail.assignerPosition}`}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: true }}
              multiline
              maxRows={3}
              sx={{ my: 2 }}
            />
            <TextField
              label="Assigned at"
              value={convertSecsToDateTime(taskDetail.assignedAt)}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: true }}
              sx={{ my: 2 }}
            />
            <Box sx={{ my: 2 }}>
              <InputLabel sx={{ transform: "scale(0.75)" }}>Status</InputLabel>
              <DisplayedReviewTaskStatus status={taskDetail.status} />
            </Box>
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "right", gap: 1 }}>
            <Button variant="contained">Sign Draft</Button>
          </Box>
        </Paper>
        <>
          <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, p: 4, mt: 4 }}>
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
          </Paper>
          {draftDetailQuery.isSuccess && (
            <DocumentContexBox documentUri={draftDetailQuery.data.docUri} />
          )}
        </>
      </>
    );
  }

  return <ContentError />;
}
