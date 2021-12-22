import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ACTION_BUTTONS } from "../utils/constants";

export default function ConfirmDialog({
  setOpen,
  message,
  handleOnConfirm,
  handleOnCancel,
}) {
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleOnCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnConfirm}>{ACTION_BUTTONS.yes.name}</Button>
          <Button onClick={handleOnCancel} autoFocus>
            {ACTION_BUTTONS.cancel.name}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
