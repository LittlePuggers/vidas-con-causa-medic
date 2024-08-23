import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import {Product} from '../types/product';
import {Box, Fab, Typography, styled} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import componentStyles from './componentStyles';
import {SearchBar} from './SearchBar.tsx';
import {useState, useEffect} from 'react';
import {NewMedicineForm} from './NewMedicineForm';
import {
  getMedicines,
  // createMedicine,
  // updateMedicine,
  // deleteMedicine,
} from '../api.ts';

interface MedicTableProps {
  products: Product[];
}

interface Medicine {
  id: number;
  name: string;
}

const {gridStyles} = componentStyles;

const BoxHead = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1em 2em',
}));

const MedicTable: React.FC<MedicTableProps> = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    const response = await getMedicines();
    setMedicines(response.data);
    console.log(response.data);
  };

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
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
      type: 'number',
      width: 90,
    },
    {
      field: 'bestUsedBy',
      headerName: 'Próximo a vencer',
      width: 160,
    },
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async () => {
    await loadMedicines();
    setOpen(false);
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
        <SearchBar></SearchBar>
      </Box>
      <DataGrid
        rows={medicines}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {page: 0, pageSize: 10},
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        sx={gridStyles}
      />
    </div>
  );
};

export default MedicTable;
