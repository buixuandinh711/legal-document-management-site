import { Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import YourDraft from "src/pages/YourDraft";
import DocumentDetail from "src/pages/DraftDetail";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import Layout from "src/components/Layout";
import CreateDraft from "src/pages/CreateDraft";
import PublishDocument from "src/pages/PublishDocument";
import PublishedDoc from "src/pages/PublishedDoc";
import PublishedDocDetail from "src/pages/PublishedDocDetail";
import CreateReviewingTask from "src/pages/CreateReviewingTask";
import AssignReviewing from "src/pages/AssignReviewing";
import ReviewingTask from "src/pages/ReviewingTask";
import ReviewingTaskDetail from "src/pages/ReviewingTaskDetail";
import AssignDrafting from "src/pages/AssignDrafting";
import CreateDraftingTask from "src/pages/CreateDraftingTask";
import DraftingTask from "src/pages/DraftingTask";
import DraftingTaskDetail from "src/pages/DraftingTaskDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Typography variant="h1">Root</Typography>} />
          <Route path="drafting-tasks" element={<DraftingTask />} />
          <Route path="drafting-tasks/:id" element={<DraftingTaskDetail />} />
          <Route path="draft" element={<YourDraft />} />
          <Route path="draft/create" element={<CreateDraft />} />
          <Route path="draft/:id" element={<DocumentDetail />} />
          <Route path="publish" element={<PublishDocument />} />
          <Route path="published" element={<PublishedDoc />} />
          <Route path="published/:contentHash" element={<PublishedDocDetail />} />
          <Route path="assign-reviewing" element={<AssignReviewing />} />
          <Route path="assign-reviewing/create" element={<CreateReviewingTask />} />
          <Route path="reviewing-tasks" element={<ReviewingTask />} />
          <Route path="reviewing-tasks/:id" element={<ReviewingTaskDetail />} />
          <Route path="assign-drafting" element={<AssignDrafting />} />
          <Route path="assign-drafting/create" element={<CreateDraftingTask />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
