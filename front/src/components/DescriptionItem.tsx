import {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';

const ItemText = styled(ListItemText)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  '& .MuiListItemText-primary': {
    fontSize: '1em',
    color: 'navy',
    paddingLeft: '1em',
  },
  '& .MuiListItemText-secondary': {
    fontSize: '1.2em',
    paddingRight: '1em',
  },
}));

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
  const [isEditing, setIsEditing] = useState(false); // Track whether the item is being edited
  const [currentValue, setCurrentValue] = useState(value); // Track the current value of the item

  // Handle clicking the edit/save button
  const handleEditClick = () => {
    if (isEditing) {
      onSave(label, currentValue); // Trigger save action when editing is done
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <>
      <ListItem disablePadding>
        <ItemText
          primary={label}
          secondary={
            isEditing ? (
              <TextField
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                variant="outlined"
                size="small"
                // sx={{width: '60%'}} // Adjust width as needed
              />
            ) : (
              currentValue
            )
          }
        />
        <IconButton edge="end" aria-label="edit" onClick={handleEditClick}>
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};
