import { createTheme } from '@material-ui/core/styles';

const inputTheme = createTheme({
    components: {
        // Name of the component
        MuiFormControl: {
            styleOverrides: {
                root: {
                    // Some CSS
                    // color: 'white !important',
                    color: 'white',
                },
            },
        },
    },
})

export default inputTheme ;