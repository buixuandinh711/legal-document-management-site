import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const CustomTextField: React.FC<React.ComponentProps<typeof TextField>> = (
  props
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("tai lieu so 1");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <TextField
      {...props}
      value={text}
      InputProps={{
        readOnly: !isEditing,
        endAdornment: (
          <IconButton onClick={handleEditClick}>
            {isEditing ? <CheckIcon /> : <EditIcon />}
          </IconButton>
        ),
      }}
      onChange={handleTextChange}
    />
  );
};

export default CustomTextField;
