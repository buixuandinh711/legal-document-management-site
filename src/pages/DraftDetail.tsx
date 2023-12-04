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

  const workingPosition = useAppSelector((state) => state.position);
  const draftDetailQuery = useDraftDetailQuery(
    {
      divisionOnchainId: workingPosition.divisionOnchainId,
      positionIndex: workingPosition.positionIndex,
      draftId: parseInt(id!),
    },
    { skip: id === undefined || isNaN(parseInt(id)) }
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
          p: 4,
          pt: 2,
          borderRadius: 4,
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
            Chi tiết bản thảo
          </Typography>
          <Button
            variant="text"
            startIcon={<Edit />}
            disabled={isEditing}
            sx={{
              textTransform: "none",
              display: "none",
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
              label="Tên bản thảo"
              value={draftDetailQuery.data.name}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: !isEditing }}
              sx={{ my: 2 }}
            />
            <TextField
              label="Số hiệu văn bản"
              value={draftDetailQuery.data.documentNo}
              fullWidth
              variant="standard"
              InputProps={{ readOnly: !isEditing }}
              sx={{ my: 2 }}
            />
            <TextField
              label="Tên văn bản"
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
                label="Loại văn bản"
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
                label="Loại văn bản"
                id="documentType"
                name="documentType"
                autoComplete="documentType"
                value={"1"}
              >
                <MenuItem value="1">{"Bo Luat"}</MenuItem>
              </TextField>
            )}
            <TextField
              label="Người soạn thảo"
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
              label="Cập nhật lần cuối"
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
              <InputLabel sx={{ transform: "scale(0.75)", mb: 1 }}>Nội dung văn bản</InputLabel>
              <Chip
                label={draftDetailQuery.data.fileName}
                icon={<AttachFile />}
                variant="outlined"
                sx={{ maxWidth: 300, cursor: "pointer" }}
                onClick={() => {
                  window.open(draftDetailQuery.data.docUri, "_blank");
                }}
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
            Hủy
          </Button>
          <Button variant="contained" endIcon={<Send />} sx={{ width: "120px" }}>
            Xác nhận
          </Button>
        </Box>
      </Paper>
    )
  );
}
