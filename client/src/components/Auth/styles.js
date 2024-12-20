import { makeStyles } from '@mui/styles';
// import { width } from '@mui/system';

const purple = "#690069"

export default makeStyles((theme) => ({

  flex:
  {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(8),


    flexDirection: 'column',
    gap: '10px',

    color: "black",
    background: '#FFF',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },


  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },


  inputComponent:
  {
    "&.MuiInputBase-input.MuiOutlinedInput-input": {

      color: purple,
    },

    "&.MuiInputBase-input:focus": {

      outline: `1px solid ${purple}`,

    },

    "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: purple,
      background: "white",
      padding: " 0px 5px",
    },

    "&.input:-internal-autofill-selected": {
      color: purple,
    },
  },


  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  googleButton: {
    "&.MuiButton-contained": {
      marginBottom: theme.spacing(2),
      width: '100%'
    },

  },


}));