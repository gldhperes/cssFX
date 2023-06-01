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

   

  },

  textField: {
    

  },


  searchButton: {
    "&.MuiButtonBase-root":
      {
        color: "#650065",
        fontWeight: '600',
        backgroundColor: 'white',
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