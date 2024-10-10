import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

const dimUserPhoto = '50px'

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

    // "&.MuiButton-root.MuiButton-label": {
    //   color: '#650065 !important',
    // },

    "&.MuiButton-label": {
      color: '#650065 !important',
    },

  },

  navbarButton:
  {
    color: "#650065",
    fontWeight: 'bold',
    backgroundColor: 'white',
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

  avatar: {
    width: dimUserPhoto,
    height: dimUserPhoto,
    borderRadius: '50%',


    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  userImg: {
    width: '100%',
    heigth: '100%',
  },


  navMenu: {
    "&.MuiPaper-root": {
      color: 'white',
      backgroundColor: 'black',
      border: '1px solid white',
    },

    "&.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root:hover": {
      color: '#990099',
    },

  }

}));