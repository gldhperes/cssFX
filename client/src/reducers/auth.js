import { AUTH, CHECKUSER, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            // console.log(`${AUTH}: ${JSON.stringify({ ...action?.data })}`);

            // if (localStorage.getItem("profile") !== null) return;
            
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))

            return { ...state, authData: action?.data };

        case CHECKUSER:
            console.log(`${CHECKUSER}: ${action.payload}`);

            // localStorage.clear()
            return { ...state };


        case LOGOUT:
            console.log("USER LOGGED OUT");
            localStorage.clear()

            return { ...state, authData: null };

        default:
            return state;
    }
}

export default authReducer