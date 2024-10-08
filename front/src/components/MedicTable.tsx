import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Link, useLocation} from 'react-router-dom';
import {Medicine} from '../types/Medicine.ts';
import {Box, Fab, Typography, styled} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import componentStyles from './componentStyles';
import {SearchBar} from './SearchBar.tsx';
import {useEffect, useState} from 'react';
import {NewMedicineForm} from './NewMedicineForm';
import {SnackbarAlert} from './SnackbarAlert.tsx';

interface MedicTableProps {
  medicines: Medicine[];
  setMedicines: (medicines: Medicine[]) => void;
}

const {gridStyles} = componentStyles;

const BoxHead = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1em 2em',
}));

const MedicTable: React.FC<MedicTableProps> = ({medicines, setMedicines}) => {
  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 50},
    {
      field: 'name',
      headerName: 'Nombre',
      width: 130,
      renderCell: (params) => (
        <Link
          to={`/medicine/${params.row.id}`}
          style={{textDecoration: 'none'}}
        >
          <Typography variant="body2" color="primary">
            {params.value}
          </Typography>
        </Link>
      ),
    },
    {field: 'components', headerName: 'Componente', width: 130},
    {field: 'concentration', headerName: 'Concentración', width: 90},
    {field: 'category', headerName: 'Categoría', width: 130},
    {
      field: 'stock',
      headerName: 'Stock',
      width: 90,
      renderCell: (params) => `${params.row.stock} ${params.row.unit}`,
    },
    {
      field: 'bestUsedBy',
      headerName: 'Próximo a vencer',
      width: 160,
    },
  ];

  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [filteredMeds, setFilteredMeds] = useState<Medicine[]>(medicines);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.snackbarMsg) {
      setSnackbarMsg(location.state.snackbarMsg);
      setOpenSnackbar(true);
    }
  }, [location.state]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (newMedicine: Medicine) => {
    setMedicines([...medicines, newMedicine]);
    setOpen(false);
    setOpenSnackbar(true);
    setSnackbarMsg('New medicine added successfully!');
  };

  return (
    <div style={{height: 400, width: '100%'}}>
      <BoxHead sx={{'& > :not(style)': {m: 1}}}>
        <Typography color="text.primary">Tabla de Medicamentos</Typography>
        <Fab variant="extended" onClick={handleClickOpen}>
          <AutoAwesomeIcon sx={{mr: 1}} />
          Agregar nuevo
        </Fab>
        <NewMedicineForm
          open={open}
          handleClose={handleClose}
          onSubmit={handleFormSubmit}
        />
      </BoxHead>
      <Box>
        <SearchBar
          medicines={medicines}
          setFilteredMeds={setFilteredMeds}
        ></SearchBar>
      </Box>
      <DataGrid
        rows={filteredMeds}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {page: 0, pageSize: 10},
          },
        }}
        pageSizeOptions={[10, 20, 30]}
        // checkboxSelection
        sx={gridStyles}
      />
      <SnackbarAlert
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        msg={snackbarMsg}
      />
    </div>
  );
};

export default MedicTable;
