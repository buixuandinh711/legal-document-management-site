import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Position } from "src/utils/types";
import { useAppDispatch, useAppSelector } from "src/context/store";
import { switchPosition } from "src/context/slices/positionSlice";
import { useEffect } from "react";

export default function SelectPosition({ positions }: { positions: Position[] }) {
  const workingPosition = useAppSelector((state) => state.position);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      switchPosition({
        divisionId: positions[0].divisionId,
        positionIndex: positions[0].positionIndex,
        positionRole: positions[0].positionRole,
      })
    );
  }, [dispatch, positions]);

  const handlePositionChange = (event: SelectChangeEvent) => {
    const selectedPosition = positions.find(
      (p) => `${p.divisionId}/${p.positionIndex}` === event.target.value
    );
    if (selectedPosition !== undefined) {
      dispatch(
        switchPosition({
          divisionId: selectedPosition.divisionId,
          positionIndex: selectedPosition.positionIndex,
          positionRole: selectedPosition.positionRole,
        })
      );
    }
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          "& .MuiInput-underline:before": {
            borderBottomColor: "#fff8", // Semi-transparent underline
          },
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#fff", // Solid underline on hover
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#fff", // Solid underline on focus
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        }}
        size="small"
        variant="standard"
      >
        <Select
          value={`${workingPosition.divisionId}/${workingPosition.positionIndex}`}
          onChange={handlePositionChange}
          //   disableUnderline
          sx={{
            color: "#fff",
          }}
        >
          {positions.map((position) => (
            <MenuItem
              key={`${position.divisionId}/${position.positionIndex}`}
              value={`${position.divisionId}/${position.positionIndex}`}
            >
              {`${position.divisionName} - ${position.positionName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
