import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Link } from "react-router-dom";
import {
  AssignmentInd,
  Draw,
  FactCheck,
  Grading,
  LibraryBooks,
  NoteAlt,
  Publish,
  Task,
} from "@mui/icons-material";

export const mainListItems = (
  <React.Fragment>
    <Link to="/drafting" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <NoteAlt />
        </ListItemIcon>
        <ListItemText primary="Drafting Task" />
      </ListItemButton>
    </Link>
    <Link to="/reviewing" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Grading />
        </ListItemIcon>
        <ListItemText primary="Reviewing Task" />
      </ListItemButton>
    </Link>
    <Link to="/draft" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <LibraryBooks />
        </ListItemIcon>
        <ListItemText primary="Your Drafts" />
      </ListItemButton>
    </Link>
    <Link to="/published" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <FactCheck />
        </ListItemIcon>
        <ListItemText primary="Published Docs" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Management
    </ListSubheader>
    <Link to="/manage-task" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText primary="Assign Task" />
      </ListItemButton>
    </Link>
    <Link to="/manage-reviews" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Draw />
        </ListItemIcon>
        <ListItemText primary="Review Tasks" />
      </ListItemButton>
    </Link>
    <Link to="/publish" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Publish />
        </ListItemIcon>
        <ListItemText primary="Publish Document" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
