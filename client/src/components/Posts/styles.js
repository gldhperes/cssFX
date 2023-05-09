import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

  flex: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
  },

  // =========================
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },


  // FOLLOWING ===================
  CreatorCard: {
    cursor: "pointer",

    width: "200px",
    height: "200px",

    flexFlow: 'column',

    borderRadius: "20px",
    background: "#656565",

  },

  CreatorIcon:{
    // width: '50px',
    // height: '50px',

    padding: '20px',

    borderRadius: "50%",

    color: 'white',
    background: "black",
  },

  CreatorName:{
    color: 'white',
  },



}));