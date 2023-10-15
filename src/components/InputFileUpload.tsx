import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { Box, Chip } from "@mui/material";
import { AttachFile } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  const [attached, setAttachment] = useState(true);

  return (
    <Box sx={{ mt: 1 }}>
      {attached ? (
        <Chip
          label="Luat Bao Hien Xa Hoi"
          icon={<AttachFile />}
          variant="outlined"
          onDelete={() => {
            setAttachment(false);
          }}
        />
      ) : (
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={() => setAttachment(true)}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      )}
    </Box>
  );
}
