import { GET_FAVORITE } from '../constants/actionTypes';
import * as api from '../api'

// export const getFavoritePosts = (userId) => async(dispatch) => {
export const getFavoritePosts = () => async (dispatch) => {
    try {

        dispatch({ type: GET_FAVORITE });
    } catch (error) {
        console.log('error:', error.message);
    }
}

// export default getFavoritePosts