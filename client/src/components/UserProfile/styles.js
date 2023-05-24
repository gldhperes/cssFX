import { makeStyles } from "@material-ui/core/styles";

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
        color: 'white',

        flexFlow: "column",
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
    },

    userDetails:{

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