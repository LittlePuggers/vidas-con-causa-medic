const gridStyles = {
  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: 'whitesmoke',
  },
  backgroundColor: 'white',
  '& .MuiDataGrid-cell': {
    fontWeight: '500',
    '& a': {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
    },
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: '400',
  },
};

const componentStyles = {
  gridStyles,
};

export default componentStyles;
