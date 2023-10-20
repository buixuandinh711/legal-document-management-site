import { Alert, AlertTitle, Box } from "@mui/material";

export default function ContentError() {
  return (
    <Box>
      <Alert severity="error" sx={{borderRadius: 3}}>
        <AlertTitle>Error</AlertTitle>
        Failed to load content <strong>Please try again</strong>
      </Alert>
    </Box>
  );
}
