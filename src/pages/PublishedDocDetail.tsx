import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import DocContent from "src/components/PublishedDocDetail/DocContent";
import DocInfo from "src/components/PublishedDocDetail/DocInfo";
import DocSigners from "src/components/PublishedDocDetail/DocSigners";
import ContentError from "src/pages/ContentError";

export default function PublishedDocDetail() {
  const { contentHash } = useParams();

  console.log(contentHash);

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
          Document Detail
        </Typography>
        <>
          <Box sx={{ display: "flex", gap: 2, alignItems: "stretch", maxHeight: "650px" }}>
            <DocInfo contentHash={contentHash} />
            <DocSigners contentHash={contentHash} />
          </Box>
        </>
      </Paper>
      <DocContent contentHash={contentHash} />
    </>
  );
}
