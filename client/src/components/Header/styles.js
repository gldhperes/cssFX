import { makeStyles } from '@mui/styles';
import { border } from '@mui/system';
// import { deepPurple } from '@mui/material/colors';

const dimUserPhoto = '50px'

// const purple = '#650065'
const darkPurple = '#1E001E'

export default makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexFlow: 'row ',
    justifyContent: 'center ',
    alignItems: 'center ',
  },

  appBar: {
    width: '100%',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: darkPurple,

    // [theme.breakpoints.down('xs')]: {
    //   flexDirection: 'column',
    //   justifyContent: 'center',
    //   alignItems: 'center'
    // },
  },

  image: {
    height: "60px ",
  },

  heading: {
    color: 'white ',
    textDecoration: 'none ',
    fontSize: '2em ',
    fontWeight: 300 + "",
  },

  // TOOL BAR =============================
  toolbar: {
    display: 'flex ',
    justifyContent: 'flex-end ',
    width: '400px',

    // [theme.breakpoints.down('xs')]: {
    //   width: 'auto ',
    // },
  },

  userSection: {

    gap: "20px ",

    "&.MuiButton-root.MuiButton-label": {
      color: '#650065 ',
    },

    "&.MuiButton-label": {
      color: '#650065 ',
    },

  },

  navbarButton:
  {
    color: "#650065 ",
    fontWeight: 'bold ',
    backgroundColor: 'white ',
  },

  profile: {
    gap: "20px ",
    color: 'white ',

    // [theme.breakpoints.down('sm')]: {
    //   width: 'auto ',
    //   marginTop: 20 +"",
    //   justifyContent: 'center ',
    // },
  },

  logout: {
    marginLeft: '20px ',
  },

  userName: {
    display: 'flex ',
    alignItems: 'center ',
    textAlign: 'center ',
  },

  avatar: {
    width: dimUserPhoto,
    height: dimUserPhoto,
    borderRadius: '50% ',


    // color: theme.palette.getContrastText(deepPurple[500]),
    color: darkPurple,
    backgroundColor: darkPurple,
  },

  userImg: {
    width: '100% ',
    heigth: '100% ',

    border: "50% ",
  },


  menuItem: {
    "&.MuiPaper-root": {
      color: 'white ',
      backgroundColor: 'black ',
      border: '1px solid white ',
    },

    "&.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root:hover": {
      color: '#990099 ',
    },

  }

}));

