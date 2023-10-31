import { Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DraftTask from "src/pages/DraftTask";
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
import RequestSignature from "src/pages/RequestSignature";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Typography variant="h1">Root</Typography>} />
          <Route path="drafting" element={<DraftTask />} />
          <Route path="draft" element={<ManageDraft />} />
          <Route path="draft/create" element={<CreateDraft />} />
          <Route path="draft/:id" element={<DocumentDetail />} />
          <Route path="publish" element={<PublishDocument />} />
          <Route path="published" element={<PublishedDocument />} />
          <Route path="published/:contentHash" element={<PublishedDocDetail />} />
          <Route path="req-sig" element={<RequestSignature />} />
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
