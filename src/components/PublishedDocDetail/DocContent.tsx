import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Paper } from "@mui/material";
import { Counter } from "src/components/Counter";
import { useAppSelector } from "src/context/store";
import { usePublishedDocDetailQuery } from "src/context/slices/apiSlice";
import ContentLoading from "src/pages/ContentLoading";
import ContentError from "src/pages/ContentError";

export default function DocContent({ contentHash }: { contentHash: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const workingPosition = useAppSelector((state) => state.position);
  const docDetailQuery = usePublishedDocDetailQuery({
    divisionOnchainId: workingPosition.divisionOnchainId,
    positionIndex: workingPosition.positionIndex,
    docContentHash: contentHash,
  });

  if (docDetailQuery.isLoading) {
    return <ContentLoading />;
  }

  if (docDetailQuery.isSuccess) {
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
          file={docDetailQuery.data.resourceUri}
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

  return <ContentError />;
}
