import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Paper } from "@mui/material";
import { Counter } from "src/components/Counter";

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
