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
import {
  Add,
  RemoveCircle as InProgressIcon,
  CheckCircle as SignedIcon,
  Cancel as RejectedIcon,
} from "@mui/icons-material";
import {
  ReviewTaskStatus,
  useCreatedReviewTasksQuery,
  useDraftsListQuery,
} from "src/context/slices/apiSlice";
import { useAppSelector } from "src/context/store";
import { convertSecsToDateTime } from "src/utils/utils";
import ContentLoading from "src/pages/ContentLoading";
import ContentError from "src/pages/ContentError";

export default function ManageReviewTasks() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { divisionOnchainId, positionIndex } = useAppSelector((state) => state.position);
  const createdReviewTasksQuery = useCreatedReviewTasksQuery(
    { divisionOnchainId, positionIndex },
    { skip: divisionOnchainId === "" }
  );

  const navigate = useNavigate();

  if (createdReviewTasksQuery.isLoading) {
    return <ContentLoading />;
  }

  if (createdReviewTasksQuery.isSuccess) {
    const createdReviewTasks = createdReviewTasksQuery.data;
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
            Assigned Review Tasks
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            size="small"
            sx={{ "& .MuiButton-startIcon": { mr: 0 } }}
            onClick={() => {
              navigate("/manage-reviews/create");
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
                    width: "15%",
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  Created At
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "35%",
                    fontWeight: 600,
                    color: grey[600],
                  }}
                >
                  Draft Name
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
              {createdReviewTasksQuery.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      // onClick={() => {
                      //   navigate(`/draft/${row.id}`);
                      // }}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell align="left">{convertSecsToDateTime(row.createdAt)}</TableCell>
                      <TableCell align="left">{row.draftName}</TableCell>
                      <TableCell align="left">{row.assignee}</TableCell>
                      <TableCell align="left">
                        <DisplayedStatus status={row.status} />
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
          count={createdReviewTasksQuery.data.length}
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

const statusTextStyles = {
  fontWeight: 600,
  fontSize: "0.9rem",
  color: grey[700],
};

function DisplayedStatus({ status }: { status: ReviewTaskStatus }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {(() => {
        if (status === ReviewTaskStatus.InProgress) {
          return (
            <>
              <InProgressIcon fontSize="small" color="primary" />
              <Typography {...statusTextStyles}>In-Progress</Typography>
            </>
          );
        }
        if (status === ReviewTaskStatus.Signed) {
          return (
            <>
              <SignedIcon fontSize="small" color="success" />
              <Typography {...statusTextStyles}>Signed</Typography>
            </>
          );
        }
        if (status === ReviewTaskStatus.Rejected) {
          return (
            <>
              <RejectedIcon fontSize="small" color="error" />
              <Typography {...statusTextStyles}>Rejected</Typography>
            </>
          );
        }
      })()}
    </Box>
  );
}
