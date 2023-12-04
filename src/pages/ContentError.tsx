import { Alert, AlertTitle, Box } from "@mui/material";

export default function ContentError() {
  return (
    <Box>
      <Alert severity="error" sx={{borderRadius: 3}}>
        <AlertTitle>Lỗi</AlertTitle>
        Không thể tải nội dung <strong>Hãy thử lại sau</strong>
      </Alert>
    </Box>
  );
}
