import * as React from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarAlertProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  msg: string;
}

export const SnackbarAlert = ({open, setOpen, msg}: SnackbarAlertProps) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success" // "success"(default), "info", "warning", "error"
          variant="filled" // "filled", "outlined"
          sx={{width: '100%'}}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};
