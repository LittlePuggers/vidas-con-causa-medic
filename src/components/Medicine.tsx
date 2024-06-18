import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Product} from '../types/product';
import {useParams} from 'react-router-dom';
import {Typography} from '@mui/material';
import {BasicBreadcrumbs} from './BasicBreadcrumbs';

interface MedicineProps {
  products: Product[];
}

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Medicine: React.FC<MedicineProps> = ({products}) => {
  const {id} = useParams<{id: string}>();
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <BasicBreadcrumbs medicineName={product.name} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Item>xs=6 md=8 {product.name}</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid item xs={12} md={12}>
            <Item>xs=6 md=8</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};