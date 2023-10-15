import { Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "src/components/Layout";
import "./main.css";
import DraftTask from "src/pages/DraftTask";
import TaskDetail from "src/pages/TaskDetail";
import ManageDoc from "src/pages/ManageDoc";
import DocumentDetail from "src/pages/DocumentDetail";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Typography variant="h1">Root</Typography>} />
          <Route path="drafting" element={<DraftTask />} />
          <Route path="manage-doc" element={<ManageDoc />} />
          <Route
            path="doc-detail"
            element={
              <DocumentDetail
                documentDetail={{
                  documentNo: "758/QĐ-QLD	",
                  documentName:
                    "QUYET DINH VỀ VIỆC CÔNG BỐ DANH MỤC THUỐC, NGUYÊN LIỆU LÀM THUỐC CÓ GIẤY ĐĂNG KÝ LƯU HÀNH ĐƯỢC TIẾP TỤC SỬ DỤNG THEO QUY ĐỊNH TẠI KHOẢN 1 ĐIỀU 3 NGHỊ QUYẾT SỐ 80/2023/QH15 NGÀY 09/01/2023 CỦA QUỐC HỘI (ĐỢT 8)",
                  draftName: "quy dinh abc",
                  documentType: "Quyet Dinh",
                  lastUpdated: "21:11 23/10/2023",
                }}
              />
            }
          />
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
  </React.StrictMode>
);
