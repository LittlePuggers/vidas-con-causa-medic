// import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

interface BasicBreadcrumbsProps {
  medicineName: string;
}

export const BasicBreadcrumbs = ({medicineName}: BasicBreadcrumbsProps) => {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">{medicineName}</Typography>
      </Breadcrumbs>
    </div>
  );
};
