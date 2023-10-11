import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface Column {
  id: "name" | "assignedDate" | "assigner" | "dueDate" | "status";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 250 },
  { id: "assignedDate", label: "Assigned Date", minWidth: 170 },
  { id: "assigner", label: "Assigner", minWidth: 170 },
  { id: "dueDate", label: "Due Date", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
];

interface Data {
  name: string;
  assignedDate: string; // Use the appropriate data type for dates
  assigner: string;
  dueDate: string;
  status: string;
}

function createData(
  name: string,
  assignedDate: string,
  assigner: string,
  dueDate: string,
  status: string
): Data {
  return { name, assignedDate, assigner, dueDate, status };
}

const rows = [
  createData("Task 1", "2023-10-15", "John Doe", "2023-10-30", "In Progress"),
  createData("Task 2", "2023-10-16", "Jane Smith", "2023-11-15", "Pending"),
  // Add more tasks as needed
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 4, p: 2 }}>
      <Typography
        sx={{pl: 2}}
        variant="h6"
        id="tableTitle"
        component="div"
        fontWeight={600}
        fontSize={25}
      >
        Your tasks
      </Typography>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
