import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {Typography} from '@mui/material';
import {Medicine as MedicineType} from '../types/Medicine';
import {DescriptionItem} from './DescriptionItem';
import {useState} from 'react';

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
    </Box>
  );
};
