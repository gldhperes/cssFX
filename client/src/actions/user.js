import { GET_FAVORITE, GET_USER_POSTS } from '../constants/actionTypes';
import * as api from '../api'

export const getFavoritePosts = (userId) => async(dispatch) => {

    try {

        const { data } = await api.getFavoritePosts(userId)

        dispatch({ type: GET_FAVORITE, payload: data });
    } catch (error) {
        console.log('error:', error.message);
    }
}

export const getUserPosts = (userId) => async(dispatch) => {
    try {

        const { data } = await api.getUserPosts(userId)

        dispatch({ type: GET_USER_POSTS, payload: data });
    } catch (error) {
        console.log('error:', error.message);
    }
}
// export default getFavoritePosts