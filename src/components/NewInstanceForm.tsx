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
} from '@mui/material';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';

interface NewInstanceFormProps {
  open: boolean;
  handleClose: () => void;
  medicineName2: string;
}

export const NewInstanceForm = ({
  open,
  handleClose,
  medicineName2,
}: NewInstanceFormProps) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
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
        <DialogTitle>{medicineName2}</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <DialogContentText>Fecha de caducidad</DialogContentText>
            <DatePicker
              // label="Select Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          <Box>
            <DialogContentText>Cantidad</DialogContentText>
            <TextField fullWidth label="Cantidad" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};
