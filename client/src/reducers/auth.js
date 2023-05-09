import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = ( state = { authData: null }, action ) => {
    switch (action.type) {
        case AUTH:
            console.log(`action?.data: ${ JSON.stringify( { ...action?.data } ) }`);
            localStorage.setItem('profile', JSON.stringify( { ...action?.data } ) )
            
            return { ...state, authData: action?.data };

        case LOGOUT:
            console.log( "USER LOGGED OUT" );
            localStorage.clear()
            return { ...state, authData: null };

        default:
            return state;
    }
}

export default authReducer