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
  medicineInfo: {name: string; id: number; unit: string};
  inventory: Instance[];
  onUpdateInventory: any;
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

export const Inventory = ({
  medicineInfo,
  inventory,
  onUpdateInventory,
}: InventoryProps) => {
  inventory.sort((a, b) => {
    const dateA = new Date(a.endDate).getTime();
    const dateB = new Date(b.endDate).getTime();
    return dateA - dateB;
  });

  useEffect(() => {
    return () => {
      if (timeoutMap.current) {
        Object.values(timeoutMap.current).forEach((timeoutId) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        });
      }
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(
    null
  );
  const [updatedInventory, setUpdatedInventory] = useState(inventory);
  const clickCountMap = useRef<{[key: number]: {add: number; remove: number}}>(
    {}
  );
  const timeoutMap = useRef<{[key: number]: number | null}>({});
  const initialQtyMap = useRef<{[key: number]: number | null}>({});

  const handleChangeQty = (instance: Instance, change: 'add' | 'remove') => {
    const instanceId = instance.id;

    if (!initialQtyMap.current[instanceId]) {
      initialQtyMap.current[instanceId] = instance.quantity;
      clickCountMap.current[instanceId] = {add: 0, remove: 0};
    }

    const updatedQty =
      change === 'add' ? instance.quantity + 1 : instance.quantity - 1;
    const newInventory = updatedInventory.map((inv) =>
      inv.id === instance.id ? {...inv, quantity: updatedQty} : inv
    );
    setUpdatedInventory(newInventory);

    clickCountMap.current[instanceId] = {
      ...clickCountMap.current[instanceId],
      [change]: clickCountMap.current[instanceId][change] + 1,
    };

    if (timeoutMap.current[instanceId]) {
      clearTimeout(timeoutMap.current[instanceId]!);
    }

    timeoutMap.current[instanceId] = window.setTimeout(async () => {
      const totalChange =
        clickCountMap.current[instanceId].add -
        clickCountMap.current[instanceId].remove;
      const finalQty = initialQtyMap.current[instanceId]! + totalChange;

      if (initialQtyMap.current[instanceId] !== finalQty) {
        const updatedInstance = {...instance, quantity: finalQty};
        await updateInstance(medicineInfo.id, instance.id, updatedInstance);
        onUpdateInventory(updatedInstance);
        console.log('Quantity was successfully changed');
      } else console.log('Quantity was not changed');
      clickCountMap.current[instanceId] = {add: 0, remove: 0};
      initialQtyMap.current[instanceId] = null;
      timeoutMap.current[instanceId] = null;
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

  const handleInstanceSaved = (newInstance: Instance) => {
    onUpdateInventory(newInstance);
  };

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
            onSave={handleInstanceSaved}
          />
        ) : (
          <NewInstanceForm
            open={open}
            handleClose={handleClose}
            medicineInfo={medicineInfo}
            mode={mode}
            instance={null}
            onSave={handleInstanceSaved}
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
            {updatedInventory.map((instance) => (
              <TableRow
                key={instance.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCellBody component="th" scope="row">
                  {instance.endDate}
                </TableCellBody>
                <TableCellBody>
                  {instance.quantity} {medicineInfo.unit}
                </TableCellBody>
                <TableCellBody align="right">
                  <Box sx={{'& > :not(style)': {m: 1}}}>
                    <FabTeal
                      aria-label="add"
                      size="small"
                      onClick={() => handleChangeQty(instance, 'add')}
                    >
                      <AddIcon />
                    </FabTeal>
                    <FabOrange
                      aria-label="subtract"
                      size="small"
                      onClick={() => handleChangeQty(instance, 'remove')}
                    >
                      <RemoveIcon />
                    </FabOrange>
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      size="small"
                      onClick={() => {
                        handleSelectInstance(instance);
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
