import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {useState} from 'react';

interface OptionType {
  inputValue?: string;
  id: number;
  optionName: string;
}
interface AutocompleteAddProps {
  options: OptionType[];
  style?: Object;
  size?: 'small' | 'medium';
}

const filter = createFilterOptions<OptionType>();

export const AutocompleteAdd = ({
  options,
  style,
  size,
}: AutocompleteAddProps) => {
  const [value, setValue] = useState<OptionType | null>(null);
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({optionName: ''});

  const handleClose = () => {
    setDialogValue({optionName: ''});
    toggleOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({id: 0, optionName: dialogValue.optionName});
    handleClose();
  };

  React.useEffect(() => {
    const conso = async () => {
      console.log(value);
    };
    conso();
  }, [value]);

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
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                optionName: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              optionName: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              id: 10, // ALWAYS SET TO 10 JUST AS PLACEHOLDER!!!!
              optionName: `Agregar "${params.inputValue}"`,
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
          return option.optionName;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => {
          //   const {key, ...optionProps} = props;
          return (
            <li {...props} key={option.id}>
              {option.optionName}
            </li>
          );
        }}
        freeSolo
        renderInput={(params) => <TextField {...params} />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Agregar nueva categoría</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hace falta alguna categoría en la lista? Agrégala!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.optionName}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  optionName: event.target.value,
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
            <Button type="submit">Agregar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
