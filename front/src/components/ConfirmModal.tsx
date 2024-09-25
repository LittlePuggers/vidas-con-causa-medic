import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import {Box} from '@mui/material';

interface ConfirmModalProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({text, onConfirm, onCancel}: ConfirmModalProps) {
  return (
    <React.Fragment>
      <Dialog
        open
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component: 'form',
          sx: {padding: '1rem 4rem', border: '2px solid #FF0000'},
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            sx={{
              border: '2px solid red',
              borderRadius: '50%',
              width: 'fit-content',
              height: 'fit-content',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              padding: '0.5rem',
            }}
          >
            <DeleteIcon
              sx={{
                color: 'red',
                fontSize: '3rem',
              }}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
          <Button
            sx={{
              color: 'gray',
              borderColor: 'gray',
              '&:hover': {
                borderColor: 'gray',
              },
            }}
            variant="outlined"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={onConfirm}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
