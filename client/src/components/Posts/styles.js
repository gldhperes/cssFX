import { makeStyles } from '@mui/styles';

const dimCreatorIcon = '80px'
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
    // margin: theme.spacing(1),
  },

  actionDiv: {
    textAlign: 'center',
  },

  // POSTS ================
  postsContainer: {
    width: '100%',
    padding: "10px 5px",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '25px',
  },


  // FOLLOWING ===================  
  CreatorCardContent: {
    width: '100%',
    justifyContent: 'flex-start',
    gap: '20px',
  },

  CreatorCard: {
    cursor: "pointer",

    width: "200px",
    height: "200px",

    flexFlow: 'column',
    gap: '10px',

    borderRadius: "20px",

    background: "#650065",
    color: 'white',

  },

  CreatorIcon: {
    width: dimCreatorIcon,
    height: dimCreatorIcon,

    // padding: 0,

    borderRadius: "50%",

    color: 'white',
    background: "black",
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
  },

  CreatorPhoto: {
    width: '100%',
    height: '100%',
  },

  CreatorName: {
    color: 'white',
  },



}));