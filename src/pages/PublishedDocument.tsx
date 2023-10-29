import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/context/store";
import { convertSecsToDate } from "src/utils/utils";
import { usePublishedDocsQuery } from "src/context/slices/apiSlice";
import ContentLoading from "src/pages/ContentLoading";
import ContentError from "src/pages/ContentError";

export default function PublishedDocument() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const workingPosition = useAppSelector((state) => state.position);
  const publishedDocsQuery = usePublishedDocsQuery(
    {
      divisionOnchainId: workingPosition.divisionOnchainId,
      positionIndex: workingPosition.positionIndex,
    },
    { skip: workingPosition.divisionOnchainId === "" }
  );

  const navigate = useNavigate();

  if (publishedDocsQuery.isLoading) {
    return <ContentLoading />;
  }

  if (publishedDocsQuery.isSuccess) {
    const publishedDocs = publishedDocsQuery.data;

    return (
      publishedDocsQuery.isSuccess && (
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              sx={{ pl: 2 }}
              variant="h6"
              id="tableTitle"
              component="div"
              fontWeight={600}
              fontSize={25}
            >
              Published Documents
            </Typography>
          </Box>
          <TableContainer sx={{ maxHeight: "440px" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "150px",
                      fontWeight: 600,
                      color: grey[600],
                    }}
                  >
                    No.
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "300px",
                      fontWeight: 600,
                      color: grey[600],
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "250px",
                      fontWeight: 600,
                      color: grey[600],
                    }}
                  >
                    Publisher
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "200px",
                      fontWeight: 600,
                      color: grey[600],
                    }}
                  >
                    Published Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {publishedDocs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.contentHash}
                        onClick={() => {
                          navigate(`/published/${row.contentHash}`);
                        }}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell align="left">{row.number}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.publisher}</TableCell>
                        <TableCell align="left">{convertSecsToDate(row.publishedDate)}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={publishedDocs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_event: unknown, newPage: number) => {
              setPage(newPage);
            }}
            onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            }}
          />
        </Paper>
      )
    );
  }

  return <ContentError />;
}
