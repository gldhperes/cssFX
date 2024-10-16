import { makeStyles } from "@mui/styles";

const dimProfilePhoto = '100px'

export default makeStyles(() => ({
    flex: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignItems: "center",
    },

    userProfileDetails: {
        width: '100%',
        paddingTop: "20px",
        
        color: 'white',

        flexFlow: "column",
        gap: '10px',
    },

    userDetails:{
        padding: "10px 0px",
        color: 'darkgrey',

        flexFlow: "row",
        gap: '10px',
    },

    userPhoto: {
        width: dimProfilePhoto,
        height: dimProfilePhoto,

        backgroundColor: '#650065',
        padding: 0,
        borderRadius: '50%',
    },

    postsContainer:{
        gap: '10px',
    },

    userImg: {
        width: dimProfilePhoto,
        heigth: dimProfilePhoto,
      },
}))