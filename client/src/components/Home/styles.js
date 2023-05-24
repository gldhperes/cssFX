import { makeStyles } from '@material-ui/core/styles';


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


    backgroundColor: "#1E001E",

  },

  searchArea: {
    gap: "8px",

    "&.WAMuiChipInput-label-85.WAMuiChipInput-outlined-81.WAMuiChipInput-label-85:not(.WAMuiChipInput-labelShrink-86)":
    {
      color: 'white !important',
    },
  },

  textField: {
    "&.MuiOutlinedInput-notchedOutline-45": {
      borderColor: "rgb(255, 255, 255)",
    },

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

  categoryBtn: {
    color: 'white',
  },
}));