import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {dialogTitleStyles} from './componentStyles';
import styled from '@emotion/styled';
import {Box} from '@mui/material';
import {SetStateAction, useState} from 'react';

interface NewMedicineFormProps {
  open: boolean;
  handleClose: () => void;
}

const DialogContentStyledText = styled(DialogContentText)(() => ({
  fontSize: '0.8em',
  fontWeight: 400,
  color: 'navy',
}));

export const NewMedicineForm = ({open, handleClose}: NewMedicineFormProps) => {
  const [name, setName] = useState('');
  const handleName = (event: {target: {value: SetStateAction<string>}}) => {
    setName(event.target.value);
  };

  const [category, setCategory] = useState('');
  const handleCategory = (event: {target: {value: SetStateAction<string>}}) => {
    setCategory(event.target.value);
  };

  const [components, setComponents] = useState('');
  const handleComponents = (event: {
    target: {value: SetStateAction<string>};
  }) => {
    setComponents(event.target.value);
  };

  const [concentration, setConcentration] = useState('');
  const handleConcentration = (event: {
    target: {value: SetStateAction<string>};
  }) => {
    setConcentration(event.target.value);
  };

  const save = () => {
    console.log('save');
    console.log(name);
    console.log(category);
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
        <h3>Agregar medicina</h3>
      </DialogTitle>
      <DialogContent>
        <Box>
          <DialogContentStyledText>Nombre</DialogContentStyledText>
          <TextField id="name" value={name} fullWidth onChange={handleName} />

          <DialogContentStyledText>Categoría</DialogContentStyledText>
          <TextField
            id="category"
            value={category}
            fullWidth
            onChange={handleCategory}
          />
          <DialogContentStyledText>Componentes</DialogContentStyledText>
          <TextField
            id="components"
            value={components}
            fullWidth
            onChange={handleComponents}
          />
          <DialogContentStyledText>Concentración</DialogContentStyledText>
          <TextField
            id="concentration"
            value={concentration}
            fullWidth
            onChange={handleConcentration}
          />
        </Box>
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
