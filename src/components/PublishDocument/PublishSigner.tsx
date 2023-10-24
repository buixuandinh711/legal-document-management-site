import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";
import { Box, ListItemIcon, ListSubheader } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAppSelector } from "src/context/store";
import { useDraftSignaturesQuery } from "src/context/slices/apiSlice";
import ContentLoading from "src/pages/ContentLoading";
import ContentError from "src/pages/ContentError";

export default function PublishSigner({ draftId }: { draftId: string }) {
  const parsedId = parseInt(draftId);
  const workingPosition = useAppSelector((state) => state.position);
  const draftSignaturesQuery = useDraftSignaturesQuery(
    {
      divisionOnchainId: workingPosition.divisionOnchainId,
      positionIndex: workingPosition.positionIndex,
      draftId: parsedId,
    },
    {
      skip: isNaN(parsedId),
    }
  );

  if (draftSignaturesQuery.isLoading) {
    return <ContentLoading />;
  }

  if (draftSignaturesQuery.isSuccess) {
    const signatures = draftSignaturesQuery.data;
    return (
      <Box
        sx={{
          flexBasis: "30%",
          mt: 2,
          border: "1px solid",
          borderColor: grey[400],
          borderRadius: 4,
          p: 1,
        }}
      >
        <List
          sx={{
            overflowY: "scroll",
            height: "100%",
          }}
          subheader={
            <ListSubheader component="div" sx={{ fontWeight: "700", borderRadius: 10 }}>
              Document Signed By
            </ListSubheader>
          }
        >
          {signatures.map((sig) => {
            return (
              <ListItem key={sig.id}>
                <ListItemIcon>
                  <AccountCircle fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={sig.signerName} secondary="Jan 9, 2014" />
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  }

  return <ContentError />;
}
