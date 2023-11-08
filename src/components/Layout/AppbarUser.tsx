import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { useLogoutMutation } from "src/context/slices/apiSlice";
import { useNavigate } from "react-router-dom";

export default function AppbarUser({ officerName }: { officerName: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

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
          onClick={async () => {
            setAnchorEl(null);
            try {
              await logout({}).unwrap();
              navigate("/login");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}
