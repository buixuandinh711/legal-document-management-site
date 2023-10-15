import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { blue, cyan, grey } from "@mui/material/colors";
import { Article } from "@mui/icons-material";

export default function DocumentDialogItem() {
  const [selected, setSelected] = React.useState(0);

  const handleToggle = (value: number) => {
    if (selected === value) {
      setSelected(-1);
    } else {
      setSelected(value);
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { p: 0 },
        padding: 0,
        border: `1px solid ${grey[400]}`,
        borderRadius: 2,
      }}
    >
      {[0, 1, 2].map((value) => {
        return (
          <ListItem
            key={value}
            disablePadding
            sx={{
              borderBottom: "1px solid",
              borderColor: grey[400],
              "&:last-child": {
                borderBottom: 0,
              },
              ...(selected == value
                ? {
                    backgroundColor: cyan[50],
                  }
                : {}),
            }}
          >
            <ListItemButton
              role={undefined}
              onClick={() => handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <Article sx={{ color: blue[500] }} fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={"2918_QD-UBND_m_527245"}
                secondary={"19:20 07/01/2023"}
                primaryTypographyProps={{ fontSize: "16px" }}
                secondaryTypographyProps={{ fontSize: "12px" }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
