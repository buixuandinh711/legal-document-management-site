import { Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskDetail from "src/pages/TaskDetail";
import ManageDraft from "src/pages/ManageDraft";
import DocumentDetail from "src/pages/DraftDetail";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import Layout from "src/components/Layout";
import CreateDraft from "src/pages/CreateDraft";
import PublishDocument from "src/pages/PublishDocument";
import PublishedDocument from "src/pages/PublishedDocument";
import PublishedDocDetail from "src/pages/PublishedDocDetail";
import CreateReviewTask from "src/pages/CreateReviewTask";
import ManageReviewTasks from "src/pages/ManageReviewTasks";
import AssignedReviewTasks from "src/pages/AssignedReviewTasks";
import AssignedReviewTaskDetail from "src/pages/AssignedReviewTaskDetail";
import AssignDrafting from "src/pages/AssignDrafting";
import CreateDraftingTask from "src/pages/CreateDraftingTask";
import DraftingTask from "src/pages/DraftingTask";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Typography variant="h1">Root</Typography>} />
          <Route path="drafting-tasks" element={<DraftingTask />} />
          <Route path="draft" element={<ManageDraft />} />
          <Route path="draft/create" element={<CreateDraft />} />
          <Route path="draft/:id" element={<DocumentDetail />} />
          <Route path="publish" element={<PublishDocument />} />
          <Route path="published" element={<PublishedDocument />} />
          <Route path="published/:contentHash" element={<PublishedDocDetail />} />
          <Route path="assign-reviewing" element={<ManageReviewTasks />} />
          <Route path="assign-reviewing/create" element={<CreateReviewTask />} />
          <Route path="review-tasks" element={<AssignedReviewTasks />} />
          <Route path="review-tasks/:id" element={<AssignedReviewTaskDetail />} />
          <Route path="assign-drafting" element={<AssignDrafting />} />
          <Route path="assign-drafting/create" element={<CreateDraftingTask />} />
          <Route
            path="detail"
            element={
              <TaskDetail
                task={{
                  name: "Task 1",
                  assignedDate: "07/10/2023",
                  assigner: "Bui Xuan Dinh",
                  dueDate: "07/10/2023",
                  status: "In-progress",
                }}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
