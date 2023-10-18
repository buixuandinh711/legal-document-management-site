import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Link } from "react-router-dom";
import { Grading, LibraryBooks, NoteAlt, Publish, Task } from "@mui/icons-material";

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
    <Link to="/manage-draft" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <LibraryBooks />
        </ListItemIcon>
        <ListItemText primary="Your Drafts" />
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
          <Task />
        </ListItemIcon>
        <ListItemText primary="Assigning Task" />
      </ListItemButton>
    </Link>
    <Link to="/submit-doc" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Publish />
        </ListItemIcon>
        <ListItemText primary="Submit Document" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
