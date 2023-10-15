import { AttachFile } from "@mui/icons-material";
import { Box, Chip } from "@mui/material";
import { useState } from "react";
import DocumentDialog from "src/components/DocumentDialog";

export default function AttachDocument() {
  const [attached, setAttachment] = useState(false);

  return (
    <>
      <Box sx={{ mt: 1 }}>
        {attached ? (
          <Chip
            label="Luat Bao Hien Xa Hoi"
            variant="outlined"
            onDelete={() => {
              setAttachment(false);
            }}
          />
        ) : (
          <Chip
            icon={<AttachFile />}
            label="Choose document"
            onClick={() => {
              setAttachment(true);
            }}
          />
        )}
      </Box>
      <DocumentDialog open={attached} />
    </>
  );
}
