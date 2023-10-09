import { Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "src/components/Layout";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Typography variant="h1">Root</Typography>}
          />
          <Route
            path="/about"
            element={<Typography variant="h1">About</Typography>}
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
