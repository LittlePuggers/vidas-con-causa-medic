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
  Select,
  MenuItem,
  styled,
} from '@mui/material';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';
import {dialogTitleStyles} from './componentStyles';
import {createInstance, updateInstance} from '../api';
import {Instance} from '../types/Instance';

interface NewInstanceFormProps {
  open: boolean;
  handleClose: () => void;
  medicineInfo: {name: string; id: number};
  mode: 'edit' | 'create';
  instance: Instance | null;
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
}: NewInstanceFormProps) => {
  const initialState = instance
    ? instance
    : {
        medicineId: medicineInfo.id,
        quantity: 0,
        unit: '',
        endDate: '',
      };

  const [newInstanceData, setNewInstanceData] = useState(initialState);

  // useEffect(() => {
  //   if (mode === 'edit' && instance) {
  //     setNewInstanceData({
  //       ...newInstanceData,
  //       quantity: instance.quantity,
  //       unit:
  //         instance.unit === 'tabletas'
  //           ? 'tablets'
  //           : instance.unit === 'gramos'
  //           ? 'grams'
  //           : instance.unit === 'mililitros'
  //           ? 'mililiters'
  //           : '',
  //       endDate: instance.endDate,
  //     });
  //   } else if (mode === 'create') {
  //     setNewInstanceData({
  //       ...newInstanceData,
  //       quantity: 0,
  //       unit: '',
  //       endDate: '',
  //     });
  //   }
  // }, [mode, instance]);

  const handleChange = (e: {target: {name: any; value: any}}) => {
    const {name, value} = e.target;
    setNewInstanceData({
      ...newInstanceData,
      [name]: name === 'quantity' ? +value : value,
    });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setNewInstanceData((prevData) => ({
      ...prevData,
      endDate: date ? date.toISOString().slice(0, 10) : '',
    }));
  };

  const handleDelete = (id: number) => {
    alert(`Seguro que quieres eliminar esta instancia? ${id}`);
  };

  const handleSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();

    if (
      !newInstanceData.quantity ||
      !newInstanceData.unit.trim() ||
      !newInstanceData.endDate.trim()
    ) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      if (mode === 'create') {
        const response = await createInstance(newInstanceData);
        console.log('Instance saved:', response.data);
        setNewInstanceData({
          medicineId: medicineInfo.id,
          quantity: 0,
          unit: '',
          endDate: '',
        });
      } else if (mode === 'edit' && instance) {
        const response = await updateInstance(
          medicineInfo.id,
          instance.id,
          newInstanceData
        );
        console.log('Instance updated:', response.data);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving instance: ', error);
    }
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
          <p>{mode}</p>
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
        <RowBox>
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
          <Box>
            <DialogContentStyledText>Unidad</DialogContentStyledText>
            <Select
              required
              id="unit"
              name="unit"
              value={newInstanceData.unit}
              onChange={handleChange}
              sx={{width: '125px'}}
            >
              <MenuItem value={'tablets'}>Tabletas</MenuItem>
              <MenuItem value={'grams'}>Gramos</MenuItem>
              <MenuItem value={'mililiters'}>Mililitros</MenuItem>
            </Select>
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
          disabled={
            newInstanceData.quantity <= 0 ||
            !newInstanceData.unit ||
            !newInstanceData.endDate
          }
        >
          Guardar
        </Button>
        {mode === 'edit' ? (
          <Button
            variant="contained"
            sx={{backgroundColor: 'red'}}
            onClick={() => handleDelete}
          >
            Eliminar
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};
