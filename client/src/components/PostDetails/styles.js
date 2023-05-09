import { makeStyles } from '@material-ui/core/styles';

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
  },

  section: {
    width: '100%',
    borderRadius: '20px',
    margin: '10px',
   
  },

  imageSection: {
    width: '100%',
  },

  recommendedPosts: {
    display: 'flex',
   
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

  editorName:
  {
    fontSize:'14px',
    padding: '5px 15px',
    color: 'white',
    backgroundColor: monokaiBackgroundColor,
    
    borderTopLeftRadius: editorRadius,
    borderTopRightRadius: editorRadius,
  },
  
 

}));