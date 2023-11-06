import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useAppSelector } from "src/context/store";
import { useSignerNotSignedQuery } from "src/context/slices/apiSlice";
import { ListSubheader } from "@mui/material";
import { getDisplayName } from "src/utils/utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectSigner({
  draftId,
  selectedSigners,
  setSelectedSigners,
}: {
  draftId: number;
  selectedSigners: string[];
  setSelectedSigners: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const workingPosition = useAppSelector((state) => state.position);
  const signerNotSignedQuery = useSignerNotSignedQuery(
    {
      divisionOnchainId: workingPosition.divisionOnchainId,
      positionIndex: workingPosition.positionIndex,
      draftId: draftId,
    },
    { skip: workingPosition.divisionOnchainId === "" }
  );

  if (!signerNotSignedQuery.isSuccess) return;

  const signerNotSigned = signerNotSignedQuery.data;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedSigners(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ mt: 4, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Select signers</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedSigners}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Select signers" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={getDisplayName(signerNotSigned, value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          sx={{ borderRadius: 4 }}
        >
          {signerNotSigned.map((signer) => {
            const items = [
              <ListSubheader key={signer.signerAddress}>{signer.signerName}</ListSubheader>,
            ];
            items.push(
              ...signer.positions.map((pos) => (
                <MenuItem
                  key={`${signer.signerAddress}/${pos.positionIndex}`}
                  value={`${signer.signerAddress}/${pos.positionIndex}`}
                >
                  {pos.positionName}
                </MenuItem>
              ))
            );
            return items;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
