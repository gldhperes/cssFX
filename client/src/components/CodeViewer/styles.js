
import { makeStyles } from '@mui/styles';

const monokaiBackgroundColor = 'rgb(46, 46, 46)'
const editorRadius = '5px'

export default makeStyles((theme) => ({

  flex: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
    },
  },

  paper: {
    width: '100%',
    // padding: theme.spacing(2),
  },

  form: {
    width: '100%',
    padding: '20px',

    flexFlow: 'column',
    gap: '18px',

  },

  fileInput: {
    width: '97%',
    margin: '10px 0',

  },

  submitBtn: {

    color: "#650065",
    fontWeight: 'bold',
    backgroundColor: 'white',

    marginBottom: 10,
  },

  clearBtn:
  {
    color: "white",
    fontWeight: 'bold',
    backgroundColor: '#650065',

    "&:hover": {
      backgroundColor: '#FF0065',
    },
  },


  // CODE EDITOR ===============
  codeContainer: {
    flexFlow: 'row',
    justifyContent: 'space-between',
    gap: '18px',
    // background: '#650065',
  },

  editorContent:
  {
    flexFlow: 'column',
    alignItems: 'flex-start',

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

  errorMsgDiv:
  {
    width: '50%',
    // height: '800px',
    padding: '20px',

    position: 'absolute',
    zIndex: '10',

    color: 'white',
    fontSize: '18px',

    background: 'black',
    borderRadius: '10px',

  },




  // CODE VIEWER =====================
  code_viewer: {
    width: '100%',
    height: '400px',

    // margin: '20px 0',

    color: 'black',
    backgroundColor: 'white',

    border: '2px solid black',
  },

  // OnPostCodeViewer ===================
  onpost_code_viewer: {
    width: '100%',
    height: '100%',

    // position: "relative",
    overflow: "hidden",

    backgroundColor: 'white',
    borderRadius: '4px',
  },


  buttonOverride: {
    width: "100%",
    height: "100%",

    position: 'absolute',
    top: 0,
    left: 0,
   
    backgroundColor: 'transparent',
    border: 'none',
    zIndex: 10, 
    cursor: 'pointer',

  },

}));