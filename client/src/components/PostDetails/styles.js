import { makeStyles } from '@mui/styles';

const monokaiBackgroundColor = 'rgb(46, 46, 46)'
const editorRadius = '5px'

export default makeStyles((theme) => ({
  flex: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  media: {
    borderRadius: '15px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },

  card: {
    width: '100%',
    flexFlow: 'column',
    alignItems: 'flex-start',
  },

  section: {
    width: 'auto',
    borderRadius: '20px',
    margin: '10px',
  },

  codeExemple: {
    width: '100%',
    height: '400px',
    margin: '20px 0',
    color: 'black',
    backgroundColor: 'white',
    // border: '1px solid white',
    borderRadius: '8px',
  },

  recommendedPosts: {
    padding: '8px',
    justifyContent: 'flex-start',
    gap: '10px',
  },

  recommendedPostsCard: {
    padding: '10px',
    flexFlow: 'column',
    cursor: 'pointer',
    border: '1px solid white',
    borderRadius: '8px',

  },

  loadingPaper: {
    padding: '20px',
    borderRadius: '15px',
  },

  codeContainer:
  {
    width: '100%',

    justifyContent: 'space-between',
    // gap: '8px',
  },

  editorContent:
  {
    flexFlow: 'column',
    alignItems: 'flex-start',

  },

  editorTabs:
  {
    width: '100%',
    justifyContent: 'space-between',
    margin: '0',
  },
  
  editorName:
  {
    fontSize: '14px',
    padding: '5px 15px',
    color: 'white',
    backgroundColor: monokaiBackgroundColor,
    
    borderTopLeftRadius: editorRadius,
    borderTopRightRadius: editorRadius,
  },
  
  copyTab:{
    cursor: 'pointer',
    padding: '5px 5px',

    flexFlow : 'row',
    gap: '8px',
  },



}));