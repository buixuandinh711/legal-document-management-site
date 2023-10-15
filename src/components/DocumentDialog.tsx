import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DocumentDialogItem from "src/components/DocumentDialogItem";

export default function DocumentDialog({ open }: { open: boolean }) {
  return (
    <div>
      <Dialog
        open={open}
        PaperProps={{ sx: { borderRadius: 2, minWidth: "800px", py: 2 } }}
      >
        <DialogTitle id="document-list-dialog" sx={{ fontWeight: 600 }}>
          Select Document
        </DialogTitle>
        <DialogContent>
          <DocumentDialogItem />
        </DialogContent>
        <DialogActions>
          <Button variant="text" sx={{ mr: 2 }}>
            Cancel
          </Button>

          <Button variant="contained" sx={{ mr: 2 }}>
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
