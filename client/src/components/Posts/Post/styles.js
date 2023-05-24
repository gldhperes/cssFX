import { makeStyles } from '@material-ui/core/styles';

const postCreatorDim = "50px";
const contentPadding = '5px auto';

export default makeStyles({
  flex: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  post: {
    width: '300px',

    flexFlow: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    borderRadius: '15px',
    color: 'white',
    background: '#1E001E',
  },


  postImg: 
  {
    width: '100%',
    height: '180px',

    padding: 0,

    overflow: 'hidden',

    backgroundColor: '#650065',
    backgroundBlendMode: 'darken',
  },

  PostCodeImg:
  {
    height: '180px',

    backgroundSize: 'contain',
    backgroundPosition: "center",
  },
 

  // POST DETAILS ============================
  postDetails: {
    padding: '0 6px',
    flexFlow: 'column',
    alignItems: 'flex-start',
    // color: 'black',
  },


  tags: {
    width: '100%',
    padding: contentPadding,
    paddingLeft: '55px',

    justifyContent: 'flex-start',
    gap: '8px',

    color: 'darkgray',
  },


  // POST INFO =============================

  postInfo: {
    padding: contentPadding,
    flexFlow: 'row',
    gap: '5px',
  },

  postCreatorIcon: {
    cursor: 'pointer',
    width: postCreatorDim,
    height: postCreatorDim,
    borderRadius: '8px',

    background: 'black',
  },

  // POST CONTENT =================================
  postContent: {
    flexFlow: 'column',
    alignItems: 'flex-start',
    // color: 'white',
    // background: 'red',
  },

  postCreator:{
    cursor: "pointer",
  },

  postActions: {
    width: '100%',
    padding: contentPadding,

    flexFlow: 'row',
    justifyContent: 'flex-start',

    color: 'white',
    // background: 'green',
  },
 
  deleteBtn: {
    marginRight: '0px',
    color: "white",
  },

  // USER POST MENU ========================
  navMenu: 
  {
    "&.MuiPaper-root": {
      top: '415px !important',

      color: 'white',
      backgroundColor: 'black',
      border: '1px solid white',
    },

    
    
  },
  
  navMenuItem:
  {
    "&.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root:hover": {
      
      color: '#990099',
      
    },

  }

});