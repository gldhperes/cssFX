import { makeStyles } from '@mui/styles';
import { color } from '@mui/system';

const purple = '#650065'
const darkPurple = '#1E001E'

export default makeStyles((theme) => ({
  flex: {
    display: 'flex ',
    flexFlow: 'row ',
    justifyContent: 'center ',
    alignItems: 'center ',
  },

  // MAIN ==============
  mainContainer: {
    width: '100% ',
    padding: '20px ',

    justifyContent: 'space-between ',
    alignItems: 'flex-start ',
  },



  // PAGINATION ============

  pagination: {
    borderRadius: '4px ',

    padding: '16px ',
  },
  gridContainer: {
    // [theme.breakpoints.down('xs')]: {
    //   flexDirection: 'column-reverse ',
    // },
  },



  // SEARCH AREA ============
  searchArea: {
    justifyContent: "flex-start",
    padding: "10px 15px ",

    backgroundColor: purple,

    gap: "15px ",
  },



  // categorySection

  categorySection: {
    width: '100% ',
    padding: '5px 10px ',

    

    borderRadius: "0px ",

    // backgroundColor: "#470047 ",
  },

  AppBarBox: {
    width: "100%",
    // height: "100%",

    justifyContent: 'flex-start ',
    gap: '10px ',
  },

  categoryBtn: {
    color: 'white ',
    // background: "red",
    fontWeight: '600 ',
  },
}));