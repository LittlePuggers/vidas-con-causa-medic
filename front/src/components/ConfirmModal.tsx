import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteInstance} from '../api';

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
      >
        <DialogTitle id="alert-dialog-title">
          <DeleteIcon />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
