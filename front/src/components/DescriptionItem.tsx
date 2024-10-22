import {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import {Autocomplete} from '@mui/material';
import {categories, instanceUnits} from '../utils';

interface DescriptionItemProps {
  label: string;
  value: string;
  onSave: (arg0: string, arg1: string) => void;
}

export const DescriptionItem = ({
  label,
  value,
  onSave,
}: DescriptionItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

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
              <Autocomplete
                id={label}
                freeSolo
                sx={{width: '100%', minWidth: 160}}
                options={
                  label === 'Categoría'
                    ? categories.map((category) => category)
                    : instanceUnits.map((unit) => unit)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{minWidth: 160}}
                  />
                )}
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
