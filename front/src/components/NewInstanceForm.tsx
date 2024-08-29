import {useState} from 'react';
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
import {Dayjs} from 'dayjs';
import {dialogTitleStyles} from './componentStyles';
import {createInstance} from '../api';

interface NewInstanceFormProps {
  open: boolean;
  handleClose: () => void;
  medicineInfo: {name: string; id: number};
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
}: NewInstanceFormProps) => {
  const [newInstanceData, setNewInstanceData] = useState({
    medicineId: medicineInfo.id,
    quantity: 0,
    unit: '',
    endDate: '',
  });

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

  const handleSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    console.log(newInstanceData);

    if (
      !newInstanceData.quantity ||
      !newInstanceData.unit.trim() ||
      !newInstanceData.endDate.trim()
    ) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const response = await createInstance(newInstanceData);
      console.log('Instance saved:', response.data);
      setNewInstanceData({
        medicineId: medicineInfo.id,
        quantity: 0,
        unit: '',
        endDate: '',
      });
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
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle sx={dialogTitleStyles}>
        <p>Agregar instancia</p>
        <h3>{medicineInfo.name}</h3>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <DialogContentStyledText>Fecha de caducidad</DialogContentStyledText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={handleDateChange} />
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
            !newInstanceData.quantity ||
            !newInstanceData.unit ||
            !newInstanceData.endDate
          }
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
