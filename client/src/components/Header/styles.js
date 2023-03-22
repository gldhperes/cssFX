import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  appBar: {
    width: '100%',
    justifyContent: 'space-between',
    padding: '10px 20px',
    background: '#650065',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
  },

  image: {
    height: "60px",
  },

  heading: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },

  // TOOL BAR =============================
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',

    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
  },

  userSection: {
    gap: "20px",
  },

  profile: {
    gap: "20px",
    color: 'white',

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },

  logout: {
    marginLeft: '20px',
  },

  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },

 

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  navMenu: {
    "&.MuiPaper-root": {
      color: 'white',
      backgroundColor: 'black',
    }
    
  }

}));