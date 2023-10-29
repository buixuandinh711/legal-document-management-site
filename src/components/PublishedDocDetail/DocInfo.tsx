import { AttachFile } from "@mui/icons-material";
import { Box, Chip, InputLabel, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { usePublishedDocDetailQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";
import ContentLoading from "src/pages/ContentLoading";
import { convertSecsToDate } from "src/utils/utils";

export default function DocInfo({ contentHash }: { contentHash: string }) {
  const workingPosition = useAppSelector((state) => state.position);
  const docDetailQuery = usePublishedDocDetailQuery({
    divisionOnchainId: workingPosition.divisionOnchainId,
    positionIndex: workingPosition.positionIndex,
    docContentHash: contentHash,
  });

  if (docDetailQuery.isLoading) {
    return <ContentLoading />;
  }

  if (docDetailQuery.isSuccess) {
    const docDetail = docDetailQuery.data;
    return (
      <Box
        sx={{
          flexBasis: "70%",
          px: 2,
          border: "1px solid",
          borderColor: grey[400],
          borderRadius: 4,
        }}
      >
        <TextField
          label="Document No."
          value={docDetail.number}
          fullWidth
          variant="standard"
          InputProps={{ readOnly: true }}
          sx={{ my: 2 }}
        />
        <TextField
          label="Document Name"
          value={docDetail.name}
          fullWidth
          variant="standard"
          InputProps={{ readOnly: true }}
          multiline
          maxRows={3}
          sx={{ my: 2 }}
        />
        <TextField
          label="Document Type"
          value={docDetail.docType}
          fullWidth
          variant="standard"
          InputProps={{ readOnly: true }}
          sx={{ my: 2 }}
        />
        <TextField
          label="Publisher"
          value={docDetail.publisher}
          fullWidth
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
          sx={{ my: 2 }}
        />
        <TextField
          label="Published Date"
          value={convertSecsToDate(docDetail.publishedDate)}
          fullWidth
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
          sx={{ my: 2 }}
        />
        <TextField
          label="Document Hash"
          value={docDetail.contentHash}
          fullWidth
          variant="standard"
          InputProps={{ readOnly: true }}
          sx={{ my: 2 }}
        />
      </Box>
    );
  }

  return <ContentError />;
}
