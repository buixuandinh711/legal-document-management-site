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
} from "@mui/icons-material";

export const mainListItems = (
  <>
    <Link to="/drafting-tasks" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <NoteAlt />
        </ListItemIcon>
        <ListItemText primary="Soạn thảo" />
      </ListItemButton>
    </Link>
    <Link to="/reviewing-tasks" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Grading />
        </ListItemIcon>
        <ListItemText primary="Phê duyệt" />
      </ListItemButton>
    </Link>
    <Link to="/draft" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <LibraryBooks />
        </ListItemIcon>
        <ListItemText primary="Bản thảo" />
      </ListItemButton>
    </Link>
    <Link to="/published" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <FactCheck />
        </ListItemIcon>
        <ListItemText primary="Đã ban hành" />
      </ListItemButton>
    </Link>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" sx={{fontWeight: "600"}}>
      Dành cho quản lý
    </ListSubheader>
    <Link to="/assign-drafting" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText primary="Quản lý soạn thảo" />
      </ListItemButton>
    </Link>
    <Link to="/assign-reviewing" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Draw />
        </ListItemIcon>
        <ListItemText primary="Quản lý phê duyệt" />
      </ListItemButton>
    </Link>
    <Link to="/publish" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIcon>
          <Publish />
        </ListItemIcon>
        <ListItemText primary="Ban hành" />
      </ListItemButton>
    </Link>
  </>
);
