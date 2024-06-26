const gridStyles = {
  backgroundColor: 'white',
  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: 'whitesmoke',
  },
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

export const dialogTitleStyles = {
  paddingLeft: '0.2em',
  '& p': {
    margin: 0,
    fontSize: '0.8em',
  },
  '& h3': {
    margin: 0,
  },
};
