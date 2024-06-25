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
import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
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
const RowBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const categories = [
  'Antibiótico',
  'Dolor',
  'Parasiticida',
  'Articulaciones',
  'Oftálmico',
];

export const NewMedicineForm = ({open, handleClose}: NewMedicineFormProps) => {
  const [name, setName] = useState('');
  const handleName = (event: {target: {value: SetStateAction<string>}}) => {
    setName(event.target.value);
  };

  const [category, setCategory] = React.useState<string[]>([]);
  const handleCategory = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: {value},
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
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

  const [concUnit, setConcUnit] = useState('');
  const handleConcUnit = (event: {target: {value: SetStateAction<string>}}) => {
    setConcUnit(event.target.value);
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
          <Select
            labelId="demo-multiple-checkbox-label"
            id="category"
            multiple
            value={category}
            onChange={handleCategory}
            renderValue={(selected) => selected.join(', ')}
            fullWidth
          >
            {categories.map((categoryEl) => (
              <MenuItem key={categoryEl} value={categoryEl}>
                <Checkbox checked={category.indexOf(categoryEl) > -1} />
                <ListItemText primary={categoryEl} />
              </MenuItem>
            ))}
          </Select>

          <DialogContentStyledText>Componentes</DialogContentStyledText>
          <TextField
            id="components"
            value={components}
            fullWidth
            onChange={handleComponents}
          />
          <RowBox>
            <Box>
              <DialogContentStyledText>Concentración</DialogContentStyledText>
              <TextField
                id="concentration"
                value={concentration}
                type="number"
                sx={{width: '75px'}}
                onChange={handleConcentration}
              />
            </Box>
            <Box>
              <DialogContentStyledText sx={{textAlign: 'end'}}>
                Unidad
              </DialogContentStyledText>
              <Select
                id="concUnit"
                value={concUnit}
                onChange={handleConcUnit}
                sx={{width: '125px'}}
              >
                <MenuItem value={'mg'}>Miligramos</MenuItem>
                <MenuItem value={'ml'}>Mililitros</MenuItem>
              </Select>
            </Box>
          </RowBox>
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
