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
  const [value, setValue] = useState<OptionType | null>(null);

  const handleClose = () => {
    setDialogValue({name: ''});
    toggleOpen(false);
  };

  const handleSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();
    // setValue({id: 0, name: dialogValue.name});
    try {
      const response = await createCategory(dialogValue);
      console.log('Category saved: ', response.data);
      setOptions([...options, response.data]);
      console.log('Set options to:', [...options, response.data]);
      setValue(dialogValue);
      handleClose();
      setNewValue(dialogValue);
    } catch (error) {
      console.error('Error saving category: ', error);
    }
  };

  // React.useEffect(() => {
  //   const conso = async () => {
  //     console.log(value);
  //   };
  //   conso();
  // }, [value]);

  return (
    <>
      <Autocomplete
        sx={style}
        size={size}
        value={value}
        onChange={(event, newValue) => {
          //   if (newValue && typeof newValue === 'object') {
          //     const {id, optionName} = newValue as OptionType; // Ensure it's OptionType
          //     setValue({
          //       id: id,
          //       optionName: optionName,
          //     });
          //   } else {
          //     // Handle case when newValue is string or null
          //     setValue({
          //       id: 10,
          //       optionName: typeof newValue === 'string' ? newValue : '',
          //     });
          //   }
          console.log(newValue);
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
            setNewValue(newValue?.name);
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
        id="free-solo-dialog-demo"
        options={options}
        getOptionLabel={(option) => {
          // for example value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => {
          //   const {key, ...optionProps} = props;
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
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
            //   label="title"
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
