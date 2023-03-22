import { makeStyles } from '@material-ui/core/styles';

const postCreatorDim = "50px";
const contentPadding = '5px auto';
export default makeStyles({
  flex:{
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
    background: '#1E001E',
  },


  media: {
    width: '100%',
    height: '180px',
    backgroundColor: '#650065',
    backgroundBlendMode: 'darken',
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
   
  },


  // POST INFO =============================

  postInfo: {
    padding: contentPadding,
    flexFlow: 'row',
    gap: '5px',
  },

  postCreator: {
    width: postCreatorDim,
    height: postCreatorDim,
    borderRadius: '8px',

    background: 'black',
  },

  // POST CONTENT =================================
  postContent: {
    flexFlow: 'column',
    alignItems: 'flex-start',
    // background: 'red',
  },


  postActions: {
    width: '100%',
    padding: contentPadding,
    flexFlow: 'row',
    justifyContent: 'flex-start',
    // background: 'green',
  },

  likeBtn: {
 
  
  },



  deleteBtn:{
    marginLeft: '50px',
  },

});