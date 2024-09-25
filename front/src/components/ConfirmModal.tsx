import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteInstance} from '../api';
import {Box} from '@mui/material';

interface ConfirmModalProps {
  open: boolean;
  handleClose: () => void;
  handleCloseConfirmModal: () => void;
  medicineId: number;
  deleteInstanceId: number;
  text: string;
}

export function ConfirmModal({
  open,
  handleClose,
  handleCloseConfirmModal,
  medicineId,
  deleteInstanceId,
  text,
}: ConfirmModalProps) {
  const handleDelete = async () => {
    try {
      if (deleteInstanceId) {
        const response = await deleteInstance(medicineId, deleteInstanceId);
        console.log('Instance deleted:', response);
        handleCloseConfirmModal();
        handleClose();
      } else if (!deleteInstanceId) {
        console.log('Instance not deleted');
      }
    } catch (error) {
      console.log('Error deleting instance', error);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleCloseConfirmModal}
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
            onClick={handleCloseConfirmModal}
          >
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
