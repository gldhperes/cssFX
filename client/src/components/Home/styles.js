import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },


  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },



  // SEARCH SECTION
  searchSection: {
    width: "95%",

    padding: "5px 25px",
    margin: "10px auto",

    gap: "8px",

    borderRadius: "30px",
    backgroundColor: "#1E001E",

  },

  textField: {
    "&.MuiOutlinedInput-root": {
      position: 'relative',
      borderRadius: '25px',
    },

    "&.MuiInputBase-input": {
      color: 'white',
      padding: "8px",
    },

    "&.MuiOutlinedInput-notchedOutline": {
      borderColor: "inherit",
    },
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

  categoryBtn:{
    color: 'white',
  }





}));