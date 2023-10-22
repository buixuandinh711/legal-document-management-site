import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";

interface CounterProps {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  maxNumber: number;
}

export const Counter: React.FC<CounterProps> = ({ number, setNumber, maxNumber }) => {
  const handleIncrement = () => {
    setNumber((prev) => {
      if (prev < maxNumber) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleDecrement = () => {
    setNumber((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        border: 1,
        borderColor: "text.secondary",
        borderRadius: 1,
        position: "absolute",
        bottom: 20,
        right: "50%",
        transform: "translateX(50%)",
      }}
    >
      <IconButton onClick={handleDecrement}>
        <Remove />
      </IconButton>
      <TextField
        size="small"
        placeholder="0"
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          style: { textAlign: "center" },
        }}
        sx={{ maxWidth: 50, minWidth: 50 }}
        value={number}
      />
      <IconButton onClick={handleIncrement}>
        <Add />
      </IconButton>
    </Box>
  );
};
