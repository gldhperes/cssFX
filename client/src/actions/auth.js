import { AUTH, LOGOUT, CHECKUSER } from '../constants/actionTypes';
import * as api from '../api'

export const signin = ( formData ) => async ( dispatch ) => {
    try {
        const { data } = await api.signIn(formData) 

        dispatch({ type: AUTH, data })

    } catch (error) {
        console.log(error);
    }
}

export const signup = ( formData ) => async ( dispatch ) => {
    try {
        const { data } = await api.signUp(formData) 

        dispatch({ type: AUTH, data })
        
    } catch (error) {
        console.log(error);
    }
}

export const googleSignIn = ( profileObj ) => async ( dispatch ) => {
    try {
        const { data } = await api.googleSignIn(profileObj) 

        dispatch({ type: AUTH, data })
        
    } catch (error) {
        console.log(error);
    }
}

export const checkToken = () => async ( dispatch ) => {
    try {
        // const { data } = await api.checkToken() 
        console.log("dispatching CHECKUSER");
        
        dispatch({ type: CHECKUSER })
        
    } catch (error) {
        console.log("logout error: ", error);
    }
}

export const logout = () => async ( dispatch ) => {
    try {
        dispatch({ type: LOGOUT })
        
    } catch (error) {
        console.log("logout error: ", error);
    }
}