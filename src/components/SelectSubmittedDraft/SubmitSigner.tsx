import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";
import { Box, ListItemIcon, ListSubheader } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export default function SubmitSigner() {
  return (
    <Box
      sx={{
        maxHeight: "500px",
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
        {Array.from({ length: 15 }).map((_, index) => {
          console.log(index);
          return (
            <ListItem key={index}>
              <ListItemIcon>
                <AccountCircle fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={`Bui Xuan Dinh ${index}`} secondary="Jan 9, 2014" />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
