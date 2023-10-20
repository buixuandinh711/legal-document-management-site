import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";

export default function AppbarUser({ officerName }: { officerName: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  console.log(officerName);

  return (
    <div>
      <IconButton
        size="large"
        aria-label="current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        }}
        color="inherit"
      >
        <AccountCircle />
        <Typography sx={{ ml: 1 }}>{officerName}</Typography>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}
