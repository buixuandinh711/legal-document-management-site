import { Typography, Paper, Box, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";

type Task = {
  name: string;
  assignedDate: string;
  assigner: string;
  dueDate: string;
  status: string;
};

export default function TaskDetail({ task }: { task: Task }) {
  return (
    <Paper
      sx={{
        width: "100%",
        pt: 2,
        pb: 4,
        px: 4,
        borderRadius: 4,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h6"
        id="tableTitle"
        component="div"
        fontWeight={600}
        fontSize={25}
      >
        Task Detail
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: grey[600] }}
        >
          Task Name:
        </Typography>
        <Typography variant="h6">
          {task.name}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: grey[600] }}
        >
          Assigned Date:
        </Typography>
        <Typography variant="body2" sx={{ color: "#555" }}>
          {task.assignedDate}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: grey[600] }}
        >
          Assigner:
        </Typography>
        <Typography variant="body2" sx={{ color: "#555" }}>
          {task.assigner}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: grey[600] }}
        >
          Due Date:
        </Typography>
        <Typography variant="body2" sx={{ color: "#555" }}>
          {task.dueDate}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: grey[600] }}
        >
          Status:
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: task.status === "Completed" ? "green" : "red" }}
        >
          {task.status}
        </Typography>
      </Box>
    </Paper>
  );
}
