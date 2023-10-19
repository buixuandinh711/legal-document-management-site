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

interface Column {
  id: "lastUpdated" | "draftName" | "documentName" | "documentNo";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "lastUpdated", label: "Last Updated", minWidth: 170 },
  { id: "draftName", label: "Draft Name", minWidth: 250 },
  { id: "documentName", label: "Document Name", minWidth: 250 },
  { id: "documentNo", label: "Document No", minWidth: 170 },
];

interface Data {
  lastUpdated: string;
  draftName: string;
  documentName: string;
  documentNo: string;
}

function createData(
  lastUpdated: string,
  draftName: string,
  documentName: string,
  documentNo: string
): Data {
  return { lastUpdated, draftName, documentName, documentNo };
}

const rows = [
  createData("2023-10-15", "Draft 1", "Document 1", "001"),
  createData("2023-10-16", "Draft 2", "Document 2", "002"),
  // Add more rows as needed
];

export default function ManageDraft() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const workingPosition = useAppSelector((state) => state.position);
  const draftsListQuery = useDraftsListQuery(workingPosition);

  const navigate = useNavigate();

  console.log(draftsListQuery.data);

  return (
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
          Your Documents
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="small"
          sx={{ "& .MuiButton-startIcon": { mr: 0 } }}
          onClick={() => {
            navigate("/create-draft");
          }}
        >
          New
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.documentNo} // Assuming documentNo is unique
                  onClick={() => {
                    navigate("/draft-detail");
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
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
  );
}
