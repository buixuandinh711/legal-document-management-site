import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent, useRef } from "react";
import { Box, Chip, Typography } from "@mui/material";
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

export default function InputFileUpload({
  file,
  removeFile,
  onChange,
}: {
  file: File | null;
  removeFile: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Box sx={{ mt: 1 }}>
      {file !== null ? (
        <Chip
          label={file.name}
          icon={<AttachFile />}
          variant="outlined"
          sx={{ maxWidth: 300 }}
          onDelete={() => {
            if (fileInputRef.current) {
              fileInputRef.current.files = null;
            }
            removeFile();
          }}
        />
      ) : (
        <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            Tải lên
          </Button>
          <Typography variant="subtitle1"  sx={{ ml: 1 }}>
            Tối đa: 4MB
          </Typography>
        </Box>
      )}
      <VisuallyHiddenInput
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={onChange}
      />
    </Box>
  );
}
