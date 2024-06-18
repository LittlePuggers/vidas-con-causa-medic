import React from 'react';
import {useParams} from 'react-router-dom';
import {Product} from '../types/product';
import {Card, CardContent, Typography} from '@mui/material';

interface ProductDetailProps {
  products: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({products}) => {
  const {id} = useParams<{id: string}>();
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return <Typography variant="h5">Product not found</Typography>;
  }

  return (
    <>
      <Card style={{margin: '20px'}}>
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1">{product.component}</Typography>
          <Typography variant="h6">${product.concentration}</Typography>
          <Typography variant="h6">${product.category}</Typography>
          <Typography variant="h6">${product.stock}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductDetail;
