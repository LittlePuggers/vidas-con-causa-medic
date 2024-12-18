import {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import {instanceUnits} from '../utils';
import {AutocompleteAdd} from './AutocompleteAdd';
import {Category} from '../types/Category';

interface DescriptionItemProps {
  label: string;
  value: string;
  onSave: (arg0: string, arg1: string) => void;
  categories: Category[];
}

export const DescriptionItem = ({
  label,
  value,
  onSave,
  categories,
}: DescriptionItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstanceUnits, setSelectedInstanceUnits] = useState('');

  // Handle clicking the edit/save button
  const handleEditClick = () => {
    if (isEditing) {
      onSave(label, currentValue);
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <ListItem disablePadding>
        <div
          style={{
            textAlign: 'right',
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <strong style={{fontSize: '1em', color: 'navy', paddingLeft: '1em'}}>
            {label}
          </strong>
          <div style={{fontSize: '1.2em', paddingRight: '1em'}}>
            {isEditing && label !== 'Categoría' && label !== 'Unidades' ? (
              <TextField
                id={label}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                variant="outlined"
                size="small"
                sx={{width: '80%', minWidth: 160}}
              />
            ) : isEditing && (label === 'Categoría' || label === 'Unidades') ? (
              <AutocompleteAdd
                // id={label}
                // freeSolo
                style={{width: '100%', minWidth: 160}}
                size="small"
                initialOptions={
                  label === 'Categoría' ? categories : instanceUnits
                }
                setNewValue={
                  label === 'Categoría'
                    ? setSelectedCategories
                    : setSelectedInstanceUnits
                }
                // renderInput={(params) => (
                //   <TextField
                //     {...params}
                //     value={currentValue}
                //     onChange={(e) => setCurrentValue(e.target.value)}
                //     variant="outlined"
                //     size="small"
                //     fullWidth
                //     sx={{minWidth: 160}}
                //   />
                // )}
              />
            ) : (
              <span style={{textAlign: 'right', width: '100%'}}>
                {currentValue}
              </span>
            )}
          </div>
        </div>
        <IconButton edge="end" aria-label="edit" onClick={handleEditClick}>
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};
