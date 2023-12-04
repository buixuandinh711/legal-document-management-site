import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import DocumentContexBox from "src/components/DocumentContexBox";
import DocumentSignerBox from "src/components/DocumentSignerBox";
import DocInfo from "src/components/PublishedDocDetail/DocInfo";
import { usePublishedDocDetailQuery, usePublishedDocSigsQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import ContentError from "src/pages/ContentError";

export default function PublishedDocDetail() {
  const { contentHash } = useParams();

  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const docDetailQuery = usePublishedDocDetailQuery(
    {
      divisionOnchainId,
      positionIndex,
      docContentHash: contentHash!,
    },
    { skip: contentHash === undefined || contentHash === "" }
  );
  const docSigsQuery = usePublishedDocSigsQuery(
    {
      divisionOnchainId,
      positionIndex,
      docContentHash: contentHash!,
    },
    { skip: contentHash === undefined || contentHash === "" }
  );

  if (contentHash === undefined) return <ContentError />;

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, p: 4, pt: 2 }}>
        <Typography
          variant="h6"
          id="tableTitle"
          component="div"
          fontWeight={600}
          fontSize={25}
          sx={{ mb: 2 }}
        >
          Chi tiết văn bản
        </Typography>
        <>
          <Box sx={{ display: "flex", gap: 2, alignItems: "stretch", maxHeight: "650px" }}>
            {docDetailQuery.isSuccess && <DocInfo {...docDetailQuery.data} />}
            {docSigsQuery.isSuccess && <DocumentSignerBox signers={docSigsQuery.data} />}
          </Box>
        </>
      </Paper>
      {docDetailQuery.isSuccess && (
        <DocumentContexBox documentUri={docDetailQuery.data.resourceUri} />
      )}
    </>
  );
}
