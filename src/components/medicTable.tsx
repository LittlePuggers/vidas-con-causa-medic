import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nombre', width: 130 },
  { field: 'component', headerName: 'Componente', width: 130 },
  { field: 'concentration', headerName: 'Concentración', width: 90 },
  { field: 'category', headerName: 'Categoría', width: 130 },
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

const rows = [
  { 
    id: 1, 
    component: 'Amoxicilina', 
    concentration: '200mg', 
    name: 'Amoxipet Plus', 
    category: 'Antibiótico', 
    stock: 35 
  }, { 
    id: 2, 
    component: 'Tramadol', 
    concentration: '20mg', 
    name: 'Tramadol Pets NRV', 
    category: 'Dolor', 
    stock: 42 
  }, { 
    id: 3, 
    component: 'Clindamicina', 
    concentration: '110mg', 
    name: 'Clindacin 10', 
    category: 'Antibiótico', 
    stock: 45 
  }, { 
    id: 4, 
    component: 'Metronidazol', 
    concentration: '150mg/ml', 
    name: 'Metronida Pets 150 NRV', 
    category: 'Antibiótico', 
    stock: 16 
  }, { 
    id: 5, 
    component: 'Meloxicam', 
    concentration: '1.5mg', 
    name: 'Meloxivet', 
    category: 'Dolor', 
    stock: null 
  }, { 
    id: 6, 
    component: 'Isoxazolinas: fluralaner', 
    concentration: '250mg', 
    name: 'Bravecto', 
    category: 'Parasiticida', 
    stock: 150 
  }, { 
    id: 7, 
    component: 'Isoxazolinas: afoxolaner', 
    concentration: '28.3mg', 
    name: 'NexGard', 
    category: 'Parasiticida', 
    stock: 44 
  }, { 
    id: 8, 
    component: 'UC-II', 
    concentration: '10mg', 
    name: 'Flexadin Advanced', 
    category: 'Articulaciones', 
    stock: 36 
  }, { 
    id: 9, 
    component: 'Dorzolamida', 
    concentration: '20mg/ml', 
    name: 'Dorzolavet', 
    category: 'Oftálmico', 
    stock: 65 
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
      />
    </div>
  );
}
