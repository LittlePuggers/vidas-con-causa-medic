import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {useState} from 'react';
import {createCategory} from '../api';

interface OptionType {
  inputValue?: string;
  id?: number;
  name: string;
}
interface AutocompleteAddProps {
  initialOptions: OptionType[];
  style?: Object;
  size?: 'small' | 'medium';
  setNewValue: any;
}

const filter = createFilterOptions<OptionType>();

export const AutocompleteAdd = ({
  initialOptions,
  style,
  size,
  setNewValue,
}: AutocompleteAddProps) => {
  const [options, setOptions] = useState(initialOptions);
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({name: ''});
  const [value, setValue] = useState<OptionType[]>([]);

  const handleClose = () => {
    setDialogValue({name: ''});
    toggleOpen(false);
  };

  const handleSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();
    try {
      const response = await createCategory(dialogValue);
      const newCategory = response.data;
      console.log('Category saved: ', newCategory);
      setOptions([...options, newCategory]);
      console.log('Set options to:', [...options, newCategory]);
      setValue([...value, newCategory]);
      handleClose();
      setNewValue([...value, newCategory]);
    } catch (error) {
      console.error('Error saving category: ', error);
    }
  };

  const isOptionType = (item: any): item is OptionType => {
    return typeof item === 'object' && item !== null && 'inputValue' in item;
  };

  return (
    <>
      <Autocomplete
        multiple
        sx={style}
        size={size}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
              });
            });
          } else if (
            Array.isArray(newValue) &&
            newValue.length > 0 &&
            isOptionType(newValue[newValue.length - 1])
          ) {
            toggleOpen(true);
            setDialogValue({
              name: (newValue[newValue.length - 1] as OptionType).inputValue!,
            });
          } else {
            setValue(newValue as OptionType[]);
            setNewValue(newValue as OptionType[]);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Agregar "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="multiple-free-solo-dialog"
        options={options}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.name
        }
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        freeSolo
        renderInput={(params) => <TextField {...params} />}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar nueva categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hace falta alguna categoría en la lista? Agrégala!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={dialogValue.name}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                name: event.target.value,
              })
            }
            type="text"
            variant="standard"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
