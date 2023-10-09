import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import { Grading, LibraryBooks, NoteAlt } from "@mui/icons-material";

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/drafting" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <NoteAlt />
        </ListItemIcon>
        <ListItemText primary="Drafting" />
      </ListItemButton>
    </Link>
    <Link to="/reviewing" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Grading />
        </ListItemIcon>
        <ListItemText primary="Reviewing" />
      </ListItemButton>
    </Link>
    <Link
      to="/manage-document"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <LibraryBooks />
        </ListItemIcon>
        <ListItemText primary="Manage Docs" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <Link
      to="/current-month"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
    </Link>
    <Link
      to="/last-quarter"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItemButton>
    </Link>
    <Link
      to="/year-end-sale"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
