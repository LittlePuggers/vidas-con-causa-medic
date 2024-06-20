import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import {Product} from '../types/product';
import {Box, Fab, Typography, styled} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import componentStyles from './componentStyles';

interface MedicTableProps {
  products: Product[];
}

const {gridStyles} = componentStyles;

const BoxHead = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1em 2em',
}));

const MedicTable: React.FC<MedicTableProps> = () => {
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
    {field: 'component', headerName: 'Componente', width: 130},
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
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      width: 160,
      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  const rows: Product[] = [
    {
      id: 1,
      component: 'Amoxicilina',
      concentration: '200mg',
      name: 'Amoxipet Plus',
      category: 'Antibiótico',
      stock: 35,
      bestUsedBy: '31/octubre/2025',
    },
    {
      id: 2,
      component: 'Tramadol',
      concentration: '20mg',
      name: 'Tramadol Pets NRV',
      category: 'Dolor',
      stock: 42,
      bestUsedBy: '31/octubre/2025',
    },
    {
      id: 3,
      component: 'Clindamicina',
      concentration: '110mg',
      name: 'Clindacin 10',
      category: 'Antibiótico',
      stock: 45,
      bestUsedBy: '31/octubre/2025',
    },
    {
      id: 4,
      component: 'Metronidazol',
      concentration: '150mg/ml',
      name: 'Metronida Pets 150 NRV',
      category: 'Antibiótico',
      stock: 16,
      bestUsedBy: '31/octubre/2025',
    },
    {
      id: 5,
      component: 'Meloxicam',
      concentration: '1.5mg',
      name: 'Meloxivet',
      category: 'Dolor',
      stock: 0,
      bestUsedBy: '31/octubre/2025',
    },
    {
      id: 6,
      component: 'Isoxazolinas: fluralaner',
      concentration: '250mg',
      name: 'Bravecto',
      category: 'Parasiticida',
      stock: 150,
      bestUsedBy: '31/octubre/2025',
    },
    {
      id: 7,
      component: 'Isoxazolinas: afoxolaner',
      concentration: '28.3mg',
      name: 'NexGard',
      category: 'Parasiticida',
      stock: 44,
      bestUsedBy: '31/octubre/2025',
    },
    {
      id: 8,
      component: 'UC-II',
      concentration: '10mg',
      name: 'Flexadin Advanced',
      category: 'Articulaciones',
      stock: 36,
      bestUsedBy: '31/octubre/2025',
    },
    {
      id: 9,
      component: 'Dorzolamida',
      concentration: '20mg/ml',
      name: 'Dorzolavet',
      category: 'Oftálmico',
      stock: 65,
      bestUsedBy: '31/octubre/2025',
    },
  ];

  return (
    <div style={{height: 400, width: '100%'}}>
      <BoxHead sx={{'& > :not(style)': {m: 1}}}>
        <Typography color="text.primary">Tabla de Medicamentos</Typography>
        <Fab variant="extended">
          <AutoAwesomeIcon sx={{mr: 1}} />
          Agregar nuevo
        </Fab>
      </BoxHead>
      <DataGrid
        rows={rows}
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
