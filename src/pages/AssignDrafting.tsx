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
import { cyan, grey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useCreatedDraftingTasksQuery } from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import { convertSecsToDateTime } from "src/utils/utils";
import ContentLoading from "src/pages/ContentLoading";
import ContentError from "src/pages/ContentError";
import DisplayedDraftingTaskStatus from "src/components/DisplayedDraftingTaskStatus";

export default function AssignDrafting() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const createdDraftingTasksQuery = useCreatedDraftingTasksQuery(
    { divisionOnchainId, positionIndex },
    { skip: divisionOnchainId === "" }
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const newTaskId = searchParams.get("new");

  if (createdDraftingTasksQuery.isLoading) {
    return <ContentLoading />;
  }

  if (createdDraftingTasksQuery.isSuccess) {
    const createdDraftingTasks = [...createdDraftingTasksQuery.data].sort(
      (task1, task2) => task2.createdAt - task1.createdAt
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
            Công việc soạn thảo đã tạo
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            size="small"
            sx={{ "& .MuiButton-startIcon": { mr: 0 } }}
            onClick={() => {
              navigate("/assign-drafting/create");
            }}
          >
            Mới
          </Button>
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
                  Thời điểm tạo
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "35%",
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  Tên công việc
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "35%",
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  Người được giao
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "15%",
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  Trạng thái
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {createdDraftingTasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{
                        cursor: "pointer",
                        ...(row.id.toString() === newTaskId
                          ? {
                              backgroundColor: cyan[50],
                            }
                          : {}),
                      }}
                    >
                      <TableCell align="left">{convertSecsToDateTime(row.createdAt)}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{`${row.assignee} - ${row.assigneePosition}`}</TableCell>
                      <TableCell align="left">
                        <DisplayedDraftingTaskStatus
                          status={row.draftId !== null ? "Hoàn thành" : "Đang thực hiện"}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {createdDraftingTasks.length === 0 && (
          <Typography
            fontSize="1.5rem"
            fontWeight={600}
            sx={{ pt: 2, opacity: 0.6, textAlign: "center" }}
          >
            Chưa có công việc nào được tạo
          </Typography>
        )}
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 15]}
          component="div"
          count={createdDraftingTasks.length}
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
