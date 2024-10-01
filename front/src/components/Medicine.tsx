import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Medicine as MedicineType} from '../types/Medicine';
import {useParams} from 'react-router-dom';
import {Typography} from '@mui/material';
import {BasicBreadcrumbs} from './BasicBreadcrumbs';
import {DescriptionList} from './DescriptionList';
import {Inventory} from './Inventory';
import {loadInstances} from '../utils';
import {useEffect, useState} from 'react';
import {Instance} from '../types/Instance';
import {updateMedicine} from '../api';

interface MedicineProps {
  products: MedicineType[];
}

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
}));

export const Medicine: React.FC<MedicineProps> = ({products}) => {
  const {id} = useParams();
  const numberID = id ? +id : 0;
  const product = products.find((product) => product.id.toString() === id);
  const [inventory, setInventory] = useState<Instance[]>([]);
  const medicineInfo = {
    name: product ? product.name : '',
    id: numberID,
    unit: product ? product.unit : '',
  };

  useEffect(() => {
    loadInstances(numberID, setInventory);
  }, []);

  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }

  const updateInventory = (newInstance: Instance) => {
    setInventory((prevInventory) => {
      const index = prevInventory.findIndex((i) => i.id === newInstance.id);
      if (index > -1) {
        // Update existing instance
        const updatedInventory = [...prevInventory];
        updatedInventory[index] = newInstance;
        return updatedInventory;
      } else {
        // Add new instance
        return [...prevInventory, newInstance];
      }
    });
  };

  const handleMedEditSave = async (label: string, newValue: string) => {
    let data = {};
    switch (label) {
      case 'Concentración':
        data = {concentration: newValue};
        break;
      case 'Componentes':
        data = {components: newValue};
        break;
      case 'Categoría':
        data = {category: newValue};
        break;
      case 'Unidades':
        data = {unit: newValue};
        break;
    }
    console.log(data);
    try {
      await updateMedicine(numberID, data);
    } catch (error) {
      console.log('Error updating medicine', error);
    }
  };

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <BasicBreadcrumbs medicineName={product.name} />
        <h2>{product.name}</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{display: 'flex'}}>
            <Item>
              <DescriptionList
                medicineInfo={product}
                handleSave={handleMedEditSave}
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} sx={{display: 'flex'}}>
            <Item>xs=12 sm=6</Item>
          </Grid>
          <Grid item xs={12} md={12} sx={{display: 'flex'}}>
            <Item>
              <Inventory
                medicineInfo={medicineInfo}
                inventory={inventory}
                onUpdateInventory={updateInventory}
              ></Inventory>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
