import { makeStyles } from '@mui/styles';

// const purple = '#650065'
const darkPurple = '#1E001E'

export default makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // MAIN ==============
  mainContainer: {
    width: '100%',
    padding: '20px',

    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },



  // PAGINATION ============

  pagination: {
    borderRadius: '4px',

    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },



  // SEARCH SECTION ============
  searchSection: {
    width: "100%",

    padding: "10px 25px",

    justifyContent: "space-between",


    backgroundColor: darkPurple,
  },

  searchArea: {
    gap: "8px",
  },

  inputComponent: {
    "& .MuiTextField-root": {
      outline: `1px solid white`,
      color: 'white',
      borderRadius: '4px',
    },

    "& .MuiInputBase-input .MuiOutlinedInput-input": {
      color: 'white',
      borderRadius: '4px',
    },

    "& .MuiOutlinedInput-adornedEnd": {

      outline: `1px solid white`,
      color: 'white',
      borderRadius: '4px',
    },

    '& .MuiFormLabel-root': {
      color: 'white',
      borderRadius: '4px',
    },
    
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: "white",
      background: darkPurple,
      padding: " 0px 5px",
    },
    
    "& .MuiFormControl-root": {
      outline: `1px solid white`,
      color: 'white',
      borderRadius: '4px',
    },

    // CHIP INPUT

    "& .WAMuiChipInput-outlined-32.WAMuiChipInput-chipContainer-31.WAMuiChipInput-labeled-35":
    {
      outline: `1px solid white`,
      color: 'white',
      borderRadius: '4px',
    },
  },


  searchButton: {
    color: "#650065",
    fontWeight: 'bold',
    backgroundColor: 'white',
  },


  // categorySection

  categorySection: {
    width: '100%',
    padding: '5px 10px',

    justifyContent: 'flex-start',
    gap: '10px',

    borderRadius: "0px",

    backgroundColor: "#470047",
  },

  categoryBtn: {
    color: 'white',
    fontWeight: '600',
  },
}));