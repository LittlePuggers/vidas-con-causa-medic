import {useEffect, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Box,
  styled,
} from '@mui/material';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';
import {dialogTitleStyles} from './componentStyles';
import {createInstance, updateInstance} from '../api';
import {Instance} from '../types/Instance';
import {ConfirmModal} from './ConfirmModal';

interface NewInstanceFormProps {
  open: boolean;
  handleClose: () => void;
  medicineInfo: {name: string; id: number; unit: string};
  mode: 'edit' | 'create';
  instance: Instance | null;
  onSave: any;
  onDelete: any;
}

const DialogContentStyledText = styled(DialogContentText)(() => ({
  fontSize: '0.8em',
  fontWeight: 400,
  color: 'navy',
}));
const RowBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const NewInstanceForm = ({
  open,
  handleClose,
  medicineInfo,
  mode,
  instance,
  onSave,
  onDelete,
}: NewInstanceFormProps) => {
  const [newInstanceData, setNewInstanceData] = useState({
    id: 0,
    medicineId: medicineInfo.id,
    quantity: 0,
    endDate: '',
  });

  useEffect(() => {
    if (mode === 'edit' && instance) {
      setNewInstanceData({
        ...newInstanceData,
        id: instance.id,
        quantity: instance.quantity,
        endDate: instance.endDate,
      });
    } else if (mode === 'create') {
      setNewInstanceData({
        ...newInstanceData,
        quantity: 0,
        endDate: '',
      });
    }
  }, [mode, instance]);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleChange = (e: {target: {name: any; value: any}}) => {
    const {name, value} = e.target;
    setNewInstanceData({
      ...newInstanceData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setNewInstanceData((prevData) => ({
      ...prevData,
      endDate: date ? date.toISOString().slice(0, 10) : '',
    }));
  };

  const handleSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    const submitInstanceData = {
      ...newInstanceData,
      quantity: +newInstanceData.quantity,
    };

    if (!newInstanceData.quantity || !newInstanceData.endDate.trim()) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      if (mode === 'create') {
        const response = await createInstance(submitInstanceData);
        console.log('Instance saved:', response.data);
        onSave(response.data);
        setNewInstanceData({
          id: 0,
          medicineId: medicineInfo.id,
          quantity: 0,
          endDate: '',
        });
      } else if (mode === 'edit' && instance) {
        const response = await updateInstance(
          medicineInfo.id,
          instance.id,
          submitInstanceData
        );
        console.log('Instance updated:', response.data);
        onSave(response.data);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving instance: ', error);
    }
  };

  const handleOpenConfirmation = () => setIsConfirmationOpen(true);
  const handleCloseConfirmation = () => setIsConfirmationOpen(false);
  const handleConfirmDelete = () => {
    onDelete(instance?.id);
    handleCloseConfirmation();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        sx: {padding: '1rem 4rem', border: '2px solid #209EBB'},
      }}
    >
      <DialogTitle sx={dialogTitleStyles}>
        <div>
          {mode === 'edit' ? 'Editar instancia' : 'Agregar nueva instancia'}
          <h3>{medicineInfo.name}</h3>
        </div>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <DialogContentStyledText>Fecha de caducidad</DialogContentStyledText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(newInstanceData.endDate)}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </Box>
        <RowBox sx={{justifyContent: 'start', alignItems: 'end'}}>
          <Box>
            <DialogContentStyledText>Cantidad</DialogContentStyledText>
            <TextField
              required
              id="quantity"
              name="quantity"
              value={newInstanceData.quantity}
              type="number"
              inputProps={{min: 0}}
              sx={{width: '75px'}}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{marginLeft: '1em'}}>
            <p>{medicineInfo.unit}</p>
          </Box>
        </RowBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{color: 'gray'}}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#209EBB',
            color: 'white',
            '&:hover': {
              backgroundColor: '#19829A',
            },
          }}
          disabled={newInstanceData.quantity <= 0 || !newInstanceData.endDate}
        >
          Guardar
        </Button>
        {mode === 'edit' ? (
          <Button
            color="warning"
            variant="contained"
            onClick={handleOpenConfirmation}
          >
            Eliminar
          </Button>
        ) : null}
      </DialogActions>
      {isConfirmationOpen && (
        <ConfirmModal
          text="¿Estas seguro que deseas eliminar esta instancia?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseConfirmation}
        />
      )}
    </Dialog>
  );
};
