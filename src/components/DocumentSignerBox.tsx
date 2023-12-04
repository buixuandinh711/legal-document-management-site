import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";
import { Box, ListItemIcon, ListSubheader, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export default function DocumentSignerBox({
  signers,
}: {
  signers: { signerName: string; positionName: string }[];
}) {
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
            Văn bản được ký bởi
          </ListSubheader>
        }
      >
        {signers.length > 0 ? (
          signers.map((signer) => {
            return (
              <ListItem key={signer.signerName + signer.positionName}>
                <ListItemIcon>
                  <AccountCircle fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={signer.signerName} secondary={signer.positionName} />
              </ListItem>
            );
          })
        ) : (
          <Typography fontSize="1.2rem" fontWeight={600} sx={{ px: 2, py: 1, opacity: 0.6 }}>
            Không có chữ ký đính kèm
          </Typography>
        )}
      </List>
    </Box>
  );
}
