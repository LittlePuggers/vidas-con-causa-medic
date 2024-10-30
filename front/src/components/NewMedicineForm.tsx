import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {dialogTitleStyles} from './componentStyles';
import styled from '@emotion/styled';
import {Box, ListItemText, MenuItem, Select} from '@mui/material';
import {useState} from 'react';
import {createMedicine} from '../api';
import {Medicine} from '../types/Medicine';
import {instanceUnits} from '../utils';
import {AutocompleteAdd} from './AutocompleteAdd';
import {Category} from '../types/Category';

interface NewMedicineFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (newMedicine: Medicine) => void;
  categories: Category[];
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

export const NewMedicineForm = ({
  open,
  handleClose,
  onSubmit,
  categories,
}: NewMedicineFormProps) => {
  const [newMedicineData, setNewMedicineData] = useState({
    name: '',
    category: '',
    components: '',
    concNumber: 0,
    concUnit: '',
    unit: '',
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedInstanceUnit, setSelectedInstanceUnit] = useState('');

  const handleChange = (e: {target: {name: any; value: any}}) => {
    const {name, value} = e.target;
    setNewMedicineData({...newMedicineData, [name]: value});
  };

  const handleCategoryChange = (event: {target: {name: any; value: any}}) => {
    const {name, value} = event.target;
    console.log(name, value);
    if (name === 'category') {
      console.log('Type of category value: ', typeof value);
      setSelectedCategories(
        typeof value === 'string' ? value.split(', ') : value
      );
    } else if (name === 'instance-unit') {
      setSelectedInstanceUnit(value);
    }
  };

  const resetForm = () => {
    setNewMedicineData({
      name: '',
      category: '',
      components: '',
      concNumber: 0,
      concUnit: '',
      unit: '',
    });
    setSelectedCategories([]);
    setSelectedInstanceUnit('');
  };

  const handleFormClose = () => {
    resetForm();
    handleClose();
  };

  const handleSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    console.log(selectedCategories);
    // const categoryString = selectedCategories.join(', ');
    const newMedicineData2 = {
      name: newMedicineData.name,
      components: newMedicineData.components,
      concentration:
        newMedicineData.concNumber + ' ' + newMedicineData.concUnit,
      category: selectedCategories.toString(),
      unit: selectedInstanceUnit,
      stock: 0,
      bestUsedBy: '',
    };

    if (
      !newMedicineData2.name.trim() ||
      !newMedicineData2.category.trim() ||
      !newMedicineData2.components.trim() ||
      !newMedicineData2.concentration.trim() ||
      !newMedicineData2.unit.trim()
    ) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const response = await createMedicine(newMedicineData2);
      console.log('Medicine saved:', response.data);
      onSubmit(response.data);
      resetForm();
      handleClose();
    } catch (error) {
      console.error('Error saving medicine: ', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleFormClose}
      PaperProps={{
        component: 'form',
        sx: {padding: '1rem 4rem', border: '2px solid #209EBB'},
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle sx={dialogTitleStyles}>
        <div>
          <h2>Agregar medicina</h2>
        </div>
      </DialogTitle>
      <DialogContent>
        <Box>
          <DialogContentStyledText>Nombre</DialogContentStyledText>
          <TextField
            required
            id="name"
            name="name"
            value={newMedicineData.name}
            fullWidth
            onChange={handleChange}
          />

          <DialogContentStyledText>Categoría</DialogContentStyledText>
          {/* <Select
            labelId="demo-multiple-checkbox-label"
            id="category"
            name="category"
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            renderValue={(selected) => selected.join(', ')}
            fullWidth
            displayEmpty
          >
            {categories.map((categoryEl) => (
              <MenuItem key={categoryEl} value={categoryEl}>
                <Checkbox
                  checked={selectedCategories.indexOf(categoryEl) > -1}
                />
                <ListItemText primary={categoryEl} />
              </MenuItem>
            ))}
          </Select> */}
          <AutocompleteAdd
            initialOptions={categories}
            style={{width: 300}}
            setNewValue={setSelectedCategories}
          />

          <DialogContentStyledText>Componentes</DialogContentStyledText>
          <TextField
            required
            id="components"
            name="components"
            value={newMedicineData.components}
            fullWidth
            onChange={handleChange}
          />

          <RowBox>
            <Box>
              <DialogContentStyledText>Concentración</DialogContentStyledText>
              <TextField
                required
                id="concNumber"
                name="concNumber"
                value={newMedicineData.concNumber}
                type="number"
                sx={{width: '75px'}}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <DialogContentStyledText sx={{textAlign: 'end'}}>
                Unidad
              </DialogContentStyledText>
              <Select
                id="concUnit"
                name="concUnit"
                value={newMedicineData.concUnit}
                onChange={handleChange}
                sx={{width: '125px'}}
              >
                <MenuItem value={'mg'}>Miligramos</MenuItem>
                <MenuItem value={'ml'}>Mililitros</MenuItem>
                <MenuItem value={'%'}>%</MenuItem>
              </Select>
            </Box>
          </RowBox>

          <DialogContentStyledText>
            Unidad de instancias
          </DialogContentStyledText>
          <Select
            labelId="demo-radio-label"
            id="instance-unit"
            name="instance-unit"
            value={selectedInstanceUnit}
            onChange={handleCategoryChange}
            renderValue={(selectedInstanceUnit) => selectedInstanceUnit}
            fullWidth
            displayEmpty
          >
            {instanceUnits.map((instanceUnit) => (
              <MenuItem key={instanceUnit.id} value={instanceUnit.name}>
                <ListItemText primary={instanceUnit.name} />
              </MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormClose} sx={{color: 'gray'}}>
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
            !newMedicineData.name ||
            !selectedCategories.length ||
            !newMedicineData.components ||
            !newMedicineData.concNumber ||
            !newMedicineData.concUnit
          }
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
