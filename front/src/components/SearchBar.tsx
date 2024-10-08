import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {useState} from 'react';
import {Medicine} from '../types/Medicine';

interface SearchBarProps {
  medicines: Medicine[];
  setFilteredMeds: (arg0: Medicine[]) => void;
}

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      // '&:focus': {
      //   width: '20ch',
      // },
    },
  },
}));

export const SearchBar = ({medicines, setFilteredMeds}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const results = medicines.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMeds(results);
    } else {
      setFilteredMeds(medicines);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredMeds(medicines);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearch}
              fullWidth
              sx={{mr: 1}}
              endAdornment={
                <ClearIcon onClick={clearSearch} sx={{cursor: 'pointer'}} />
              }
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
