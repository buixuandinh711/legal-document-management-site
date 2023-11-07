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
import { useAssignedDraftingTasksQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import { convertSecsToDateTime } from "src/utils/utils";
import ContentLoading from "src/pages/ContentLoading";
import ContentError from "src/pages/ContentError";
import DisplayedDraftingTaskStatus from "src/components/DisplayedDraftingTaskStatus";

export default function DraftingTask() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const assignedDraftingTasksQuery = useAssignedDraftingTasksQuery(
    { divisionOnchainId, positionIndex },
    { skip: divisionOnchainId === "" }
  );

  const navigate = useNavigate();

  if (assignedDraftingTasksQuery.isLoading) {
    return <ContentLoading />;
  }

  if (assignedDraftingTasksQuery.isSuccess) {
    const assignedDraftingTasks = [...assignedDraftingTasksQuery.data].sort(
      (task1, task2) => task2.assignedAt - task1.assignedAt
    );

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
            Your Drafting Tasks
          </Typography>
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    width: "15%",
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  Assigned At
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "35%",
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "35%",
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  Assignee
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "15%",
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedDraftingTasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/drafting-tasks/${row.id}`)}
                    >
                      <TableCell align="left">{convertSecsToDateTime(row.assignedAt)}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{`${row.assigner} - ${row.assignerPosition}`}</TableCell>
                      <TableCell align="left">
                        <DisplayedDraftingTaskStatus
                          status={row.draftId !== null ? "Done" : "In-Progress"}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 15]}
          component="div"
          count={assignedDraftingTasks.length}
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

  return <ContentError />;
}
