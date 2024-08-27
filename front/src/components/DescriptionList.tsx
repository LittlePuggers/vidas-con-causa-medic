import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {IconButton, Typography, styled} from '@mui/material';
import {Product} from '../types/Medicine';

interface DescriptionListProps {
  medicineInfo: Product;
}

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

// const ItemIcon = styled(IconButton)(() => ({
//   marginRight: '0',
// }));

export const DescriptionList = ({medicineInfo}: DescriptionListProps) => {
  return (
    <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
      <nav aria-label="main mailbox folders">
        <List>
          <Typography color="text.primary">Descripción</Typography>
          <ListItem disablePadding>
            <ItemText
              primary="Concentración"
              secondary={medicineInfo.concentration}
            />
            <IconButton edge="end" aria-label="edit" sx={{marginRight: 0}}>
              <EditIcon />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ItemText
              primary="Componentes"
              secondary={medicineInfo.component}
            />
            <IconButton edge="end" aria-label="edit" sx={{marginRight: 0}}>
              <EditIcon />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ItemText primary="Categoría" secondary={medicineInfo.category} />
            <IconButton edge="end" aria-label="edit" sx={{marginRight: 0}}>
              <EditIcon />
            </IconButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
  );
};
