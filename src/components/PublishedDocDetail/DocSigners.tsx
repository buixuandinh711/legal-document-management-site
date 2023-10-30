import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";
import { Box, ListItemIcon, ListSubheader, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAppSelector } from "src/context/store";
import { usePublishedDocSigsQuery } from "src/context/slices/apiSlice";
import ContentLoading from "src/pages/ContentLoading";
import ContentError from "src/pages/ContentError";

export default function DocSigners({ contentHash }: { contentHash: string }) {
  const workingPosition = useAppSelector((state) => state.position);
  const docSigsQuery = usePublishedDocSigsQuery({
    divisionOnchainId: workingPosition.divisionOnchainId,
    positionIndex: workingPosition.positionIndex,
    docContentHash: contentHash,
  });

  if (docSigsQuery.isLoading) {
    return <ContentLoading />;
  }

  if (docSigsQuery.isSuccess) {
    const signatures = docSigsQuery.data;
    return (
      <Box
        sx={{
          flexBasis: "30%",
          border: "1px solid",
          borderColor: grey[400],
          borderRadius: 4,
          p: 1,
        }}
      >
        <List
          sx={{
            overflowY: "auto",
            height: "100%",
          }}
          subheader={
            <ListSubheader component="div" sx={{ fontWeight: "700", borderRadius: 10 }}>
              Document Signed By
            </ListSubheader>
          }
        >
          {signatures.length > 0 ? (
            signatures.map((sig, idx) => {
              return (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <AccountCircle fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary={sig.signerName} secondary="Jan 9, 2014" />
                </ListItem>
              );
            })
          ) : (
            <Typography fontSize="1.2rem" fontWeight={600} sx={{ px: 2, py: 1, opacity: 0.6 }}>
              No signature attached
            </Typography>
          )}
        </List>
      </Box>
    );
  }

  return <ContentError />;
}
