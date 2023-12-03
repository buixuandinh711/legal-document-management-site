import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "src/context/store";
import { switchPosition } from "src/context/slices/positionSlice";
import { useEffect } from "react";
import { Position } from "src/context/slices/apiSlice";

export default function SelectPosition({ positions }: { positions: Position[] }) {
  const workingPosition = useAppSelector((state) => state.position);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      switchPosition({
        divisionOnchainId: positions[0].divisionOnchainId,
        positionIndex: positions[0].positionIndex,
        positionRole: positions[0].positionRole,
      })
    );
  }, [dispatch, positions]);

  const handlePositionChange = (event: SelectChangeEvent) => {
    const selectedPosition = positions.find(
      (p) => `${p.divisionOnchainId}/${p.positionIndex}` === event.target.value
    );
    if (selectedPosition !== undefined) {
      dispatch(
        switchPosition({
          divisionOnchainId: selectedPosition.divisionOnchainId,
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
          value={
            workingPosition.divisionOnchainId === "" && workingPosition.positionIndex === 0
              ? ""
              : `${workingPosition.divisionOnchainId}/${workingPosition.positionIndex}`
          }
          onChange={handlePositionChange}
          //   disableUnderline
          sx={{
            color: "#fff",
          }}
        >
          {positions.map((position) => (
            <MenuItem
              key={`${position.divisionOnchainId}/${position.positionIndex}`}
              value={`${position.divisionOnchainId}/${position.positionIndex}`}
            >
              {`${position.divisionName} - ${position.positionName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
