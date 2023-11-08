import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Paper } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";

export default function DocumentContexBox({ documentUri }: { documentUri: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setNumPages(0);
    setPageNumber(1);
  }, [documentUri]);

  return (
    <Paper
      sx={{
        overflow: "hidden",
        borderRadius: 4,
        p: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        mt: 4,
        mx: "auto",
        width: "60%",
        minHeight: "800px",
      }}
    >
      <Document
        file={documentUri}
        loading={"Loading daft...."}
        onLoadSuccess={({ numPages }: { numPages: number }) => {
          setNumPages(numPages);
        }}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      {numPages > 0 && (
        <Counter number={pageNumber} setNumber={setPageNumber} maxNumber={numPages} />
      )}
    </Paper>
  );
}

const Counter = ({
  number,
  setNumber,
  maxNumber,
}: {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  maxNumber: number;
}) => {
  const handleIncrement = () => {
    setNumber((prev) => {
      if (prev < maxNumber) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleDecrement = () => {
    setNumber((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        border: 1,
        borderColor: "text.secondary",
        borderRadius: 1,
        position: "absolute",
        bottom: 20,
        right: "50%",
        transform: "translateX(50%)",
      }}
    >
      <IconButton onClick={handleDecrement}>
        <Remove />
      </IconButton>
      <TextField
        size="small"
        placeholder="0"
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          style: { textAlign: "center" },
        }}
        sx={{ maxWidth: 50, minWidth: 50 }}
        value={number}
      />
      <IconButton onClick={handleIncrement}>
        <Add />
      </IconButton>
    </Box>
  );
};
