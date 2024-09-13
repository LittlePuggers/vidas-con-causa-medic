import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {Box, Fab, Typography, styled} from '@mui/material';
import {NewInstanceForm} from './NewInstanceForm';
import {useEffect, useRef, useState} from 'react';
import {Instance} from '../types/Instance';
import {updateInstance} from '../api';

interface InventoryProps {
  medicineInfo: {name: string; id: number};
  inventory: Instance[];
}

function createData(
  id: number,
  expiration: string,
  qty: number,
  unit: string,
  btns: number
) {
  return {id, expiration, qty, unit, btns};
}

const BoxHead = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1em 0 2em',
  '& :last-child': {
    marginTop: '2em',
  },
}));
const TableCellHead = styled(TableCell)(() => ({
  fontSize: '1em',
  fontWeight: 400,
  color: 'navy',
  padding: '1em',
  paddingTop: '0',
}));
const TableCellBody = styled(TableCell)(() => ({
  fontFamily: 'Roboto',
  fontSize: '1.2em',
  fontWeight: 400,
  color: '#00000099',
  padding: '0 1em',
}));
const FabOrange = styled(Fab)(() => ({
  backgroundColor: '#FB8502',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E07702',
  },
}));
const FabTeal = styled(Fab)(() => ({
  backgroundColor: '#209EBB',
  color: 'white',
  '&:hover': {
    backgroundColor: '#19829A',
  },
}));

export const Inventory = ({medicineInfo, inventory}: InventoryProps) => {
  const rows = inventory.map((item) => {
    return createData(item.id, item.endDate, item.quantity, item.unit, 3);
  });

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(
    null
  );
  const [clickCount, setClickCount] = useState({add: 0, remove: 0});
  const timeoutRef = useRef<number | null>(null);

  const handleChangeQty = (instance: Instance, change: 'add' | 'remove') => {
    let newQty: number;
    let newInstanceData = instance;
    setClickCount((prevCount) => ({
      ...prevCount,
      [change]: prevCount[change] + 1,
    }));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(async () => {
      setClickCount((prevCount) => {
        newQty = instance.quantity + prevCount.add - prevCount.remove;
        return {add: 0, remove: 0};
      });
      if (instance.quantity !== newQty) {
        newInstanceData = {...newInstanceData, quantity: newQty};
        const response = await updateInstance(
          medicineInfo.id,
          instance.id,
          newInstanceData
        );
        console.log(response);
      } else console.log('Quantity was not changed');
    }, 1000);
  };

  const handleSelectInstance = (instance: Instance | null) => {
    if (instance !== null) {
      setMode('edit');
      setSelectedInstance(instance);
    } else if (instance === null) {
      setMode('create');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <BoxHead sx={{'& > :not(style)': {m: 1}}}>
        <Typography color="text.primary">Inventario</Typography>
        <Fab
          aria-label="create"
          variant="extended"
          onClick={() => {
            handleSelectInstance(null);
          }}
        >
          <AutoAwesomeIcon sx={{mr: 1}} />
          Nueva instancia
        </Fab>
        {mode === 'edit' && selectedInstance ? (
          <NewInstanceForm
            open={open}
            handleClose={handleClose}
            medicineInfo={medicineInfo}
            mode={mode}
            instance={selectedInstance}
          />
        ) : (
          <NewInstanceForm
            open={open}
            handleClose={handleClose}
            medicineInfo={medicineInfo}
            mode={mode}
            instance={null}
          />
        )}
      </BoxHead>
      <TableContainer>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellHead>Caducidad</TableCellHead>
              <TableCellHead>Cantidad</TableCellHead>
              <TableCellHead align="right"></TableCellHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCellBody component="th" scope="row">
                  {row.expiration}
                </TableCellBody>
                <TableCellBody>
                  {row.qty} {row.unit}
                </TableCellBody>
                <TableCellBody align="right">
                  <Box sx={{'& > :not(style)': {m: 1}}}>
                    <FabTeal
                      aria-label="add"
                      size="small"
                      onClick={() =>
                        handleChangeQty(
                          {
                            medicineId: medicineInfo.id,
                            endDate: row.expiration,
                            unit: row.unit,
                            id: row.id,
                            quantity: row.qty,
                          },
                          'add'
                        )
                      }
                    >
                      <AddIcon />
                    </FabTeal>
                    <FabOrange
                      aria-label="subtract"
                      size="small"
                      onClick={() =>
                        handleChangeQty(
                          {
                            medicineId: medicineInfo.id,
                            endDate: row.expiration,
                            unit: row.unit,
                            id: row.id,
                            quantity: row.qty,
                          },
                          'remove'
                        )
                      }
                    >
                      <RemoveIcon />
                    </FabOrange>
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={() => {
                        handleSelectInstance({
                          id: row.id,
                          medicineId: medicineInfo.id,
                          endDate: row.expiration,
                          quantity: row.qty,
                          unit: row.unit,
                        });
                      }}
                    >
                      <EditIcon />
                    </Fab>
                  </Box>
                </TableCellBody>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
