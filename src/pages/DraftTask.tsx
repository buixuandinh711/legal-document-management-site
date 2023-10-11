import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "assignedDate", headerName: "Assigned Date", width: 200 },
  { field: "name", headerName: "Name", width: 350 },
  { field: "assigner", headerName: "Assigner", width: 150 },
  { field: "dueDate", headerName: "Due Date", width: 200 },
  { field: "status", headerName: "Status", width: 100 },
];

const rows = [
  {
    id: 1,
    assignedDate: "2023-10-11",
    name: "Task 1",
    assigner: "John Doe",
    dueDate: "2023-10-15",
    status: "Incomplete",
  },
  {
    id: 2,
    assignedDate: "2023-10-12",
    name: "Task 2",
    assigner: "Jane Smith",
    dueDate: "2023-10-18",
    status: "Complete",
  },
  {
    id: 3,
    assignedDate: "2023-10-12",
    name: "Task 2",
    assigner: "Jane Smith",
    dueDate: "2023-10-18",
    status: "Complete",
  },
  {
    id: 4,
    assignedDate: "2023-10-12",
    name: "Task 2",
    assigner: "Jane Smith",
    dueDate: "2023-10-18",
    status: "Complete",
  },
  {
    id: 5,
    assignedDate: "2023-10-12",
    name: "Task 2",
    assigner: "Jane Smith",
    dueDate: "2023-10-18",
    status: "Complete",
  },
  {
    id: 6,
    assignedDate: "2023-10-12",
    name: "Task 2",
    assigner: "Jane Smith",
    dueDate: "2023-10-18",
    status: "Complete",
  },
];

export default function DraftTask() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{ backgroundColor: "#ffffff", px: 2, py: 1, borderRadius: 4 }}
      />
    </div>
  );
}
