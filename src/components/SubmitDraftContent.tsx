import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Paper } from "@mui/material";
import { Counter } from "src/components/Counter";

export default function SubmitDraftContent() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

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
        maxWidth: "60%",
        minHeight: "500px",
      }}
    >
      <Document
        file="https://storage.googleapis.com/legal_document_test/6bdbeecb40520a6b842e3e72cac21038ad59985ac6a733bc0bb7522b70041e9c"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <Counter number={pageNumber} setNumber={setPageNumber} maxNumber={numPages} />
    </Paper>
  );
}
