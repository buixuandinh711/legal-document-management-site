import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useDraftsListQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import { convertSecsToDateTime } from "src/utils/utils";
import ContentLoading from "src/pages/ContentLoading";
import ContentError from "src/pages/ContentError";

export default function YourDraft() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const workingPosition = useAppSelector((state) => state.position);
  const draftsListQuery = useDraftsListQuery(workingPosition);

  const navigate = useNavigate();

  if (draftsListQuery.isLoading) {
    return <ContentLoading />;
  }

  if (draftsListQuery.isSuccess) {
    const draftsList = draftsListQuery.data;

    return (
      draftsListQuery.isSuccess && (
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
              Your Drafts
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              size="small"
              sx={{ "& .MuiButton-startIcon": { mr: 0 } }}
              onClick={() => {
                navigate("/draft/create");
              }}
            >
              New
            </Button>
          </Box>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
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
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "150px",
                      fontWeight: 600,
                      color: grey[600],
                    }}
                  >
                    Drafter
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "350px",
                      fontWeight: 600,
                      color: grey[600],
                    }}
                  >
                    Document
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      minWidth: "200px",
                      fontWeight: 600,
                      color: grey[600],
                    }}
                  >
                    Last Updated
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {draftsList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.id}
                        onClick={() => {
                          navigate(`/draft/${row.id}`);
                        }}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.drafterName}</TableCell>
                        <TableCell align="left">{row.documentName}</TableCell>
                        <TableCell align="left">
                          {convertSecsToDateTime(row.updatedAt.secsSinceEpoch)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            {draftsList.length === 0 && (
              <Typography
                fontSize="1.5rem"
                fontWeight={600}
                sx={{ pt: 2, opacity: 0.6, textAlign: "center" }}
              >
                There is no draft
              </Typography>
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 5, 10, 15]}
            component="div"
            count={draftsList.length}
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
