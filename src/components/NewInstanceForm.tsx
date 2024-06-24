import {SetStateAction, useState} from 'react';
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
  SelectChangeEvent,
  styled,
} from '@mui/material';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';
import {dialogTitleStyles} from './componentStyles';

interface NewInstanceFormProps {
  open: boolean;
  handleClose: () => void;
  medicineName2: string;
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
  medicineName2,
}: NewInstanceFormProps) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs('MM/DD/YYYY'));

  const [qty, setQty] = useState('');

  const handleQty = (event: {target: {value: SetStateAction<string>}}) => {
    setQty(event.target.value);
  };

  const [unit, setUnit] = useState('');

  const handleUnit = (event: SelectChangeEvent) => {
    setUnit(event.target.value);
  };

  const save = () => {
    console.log('save');
    console.log(value?.format('DD/MM/YYYY'));
    console.log(qty);
    console.log(unit);
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
        <h3>{medicineName2}</h3>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <DialogContentStyledText>Fecha de caducidad</DialogContentStyledText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </Box>
        <RowBox>
          <Box>
            <DialogContentStyledText>Cantidad</DialogContentStyledText>
            <TextField
              id="quantity"
              value={qty}
              type="number"
              sx={{width: '75px'}}
              onChange={handleQty}
            />
          </Box>
          <Box>
            <DialogContentStyledText>Unidad</DialogContentStyledText>
            <Select
              id="unit"
              value={unit}
              onChange={handleUnit}
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
          onClick={save}
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#209EBB',
            color: 'white',
            '&:hover': {
              backgroundColor: '#19829A',
            },
          }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
