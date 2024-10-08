import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {Button, Fab, Typography} from '@mui/material';
import {Medicine as MedicineType} from '../types/Medicine';
import {DescriptionItem} from './DescriptionItem';
import {useState} from 'react';
import {ConfirmModal} from './ConfirmModal';
import {deleteMedicine} from '../api';
import {SnackbarAlert} from './SnackbarAlert';
import {useNavigate} from 'react-router-dom';

interface DescriptionListProps {
  medicineInfo: MedicineType;
  handleSave: (label: string, newValue: string) => void;
}

export const DescriptionList = ({
  medicineInfo,
  handleSave,
}: DescriptionListProps) => {
  const [concentration, setConcentration] = useState(
    medicineInfo.concentration
  );
  const [components, setComponents] = useState(medicineInfo.components);
  const [category, setCategory] = useState(medicineInfo.category);
  const [unit, setUnit] = useState(medicineInfo.unit);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleMedPropSave = (label: string, newValue: string) => {
    switch (label) {
      case 'concentration':
        setConcentration(newValue);
        break;
      case 'components':
        setComponents(newValue);
        break;
      case 'category':
        setCategory(newValue);
        break;
      case 'unit':
        setUnit(newValue);
        break;
    }
    handleSave(label, newValue);
  };

  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      await deleteMedicine(medicineInfo.id);
      console.log('Medicine deleted:', medicineInfo.id);
      // const updatedInventory = inventory.filter(
      //   (instance) => instance.id !== instanceId
      // );
      // setUpdatedInventory(updatedInventory);
      // handleClose();
      navigate('/', {
        state: {snackbarMsg: 'Medicine deleted successfully!'},
      });
    } catch (error) {
      console.log('Error deleting medicine', error);
    }

    setIsConfirmationOpen(false);
  };

  return (
    <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
      <nav aria-label="main mailbox folders">
        <List>
          <Typography color="text.primary">Descripción</Typography>
          <DescriptionItem
            label="Concentración"
            value={medicineInfo.concentration}
            onSave={handleMedPropSave}
          />
          <DescriptionItem
            label="Componentes"
            value={medicineInfo.components}
            onSave={handleMedPropSave}
          />
          <DescriptionItem
            label="Categoría"
            value={medicineInfo.category}
            onSave={handleMedPropSave}
          />
          <DescriptionItem
            label="Unidades"
            value={medicineInfo.unit}
            onSave={handleMedPropSave}
          />
        </List>
      </nav>
      <Button
        color="warning"
        variant="contained"
        onClick={() => setIsConfirmationOpen(true)}
      >
        Eliminar medicina
      </Button>
      {isConfirmationOpen && (
        <ConfirmModal
          text="¿Estas seguro que deseas eliminar esta medicina?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      )}
      <SnackbarAlert
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        msg={snackbarMsg}
      ></SnackbarAlert>
    </Box>
  );
};
