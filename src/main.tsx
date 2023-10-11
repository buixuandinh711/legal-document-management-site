import { Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "src/components/Layout";
import "./main.css";
import DraftTask from "src/pages/DraftTask";
import TaskDetail from "src/pages/TaskDetail";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Typography variant="h1">Root</Typography>}
          />
          <Route path="/drafting" element={<DraftTask />} />
          <Route
            path="/detail"
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
          <Route
            path="*"
            element={<Typography variant="h1">404 Not Found</Typography>}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
