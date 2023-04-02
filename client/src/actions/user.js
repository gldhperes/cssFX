import { FOLLOWING, GET_FOLLOWING, GET_FAVORITE, GET_USER_POSTS } from '../constants/actionTypes';
import * as api from '../api'

export const getFavoritePosts = (userId) => async (dispatch) => {

    try {

        const { data } = await api.getFavoritePosts(userId)

        dispatch({ type: GET_FAVORITE, payload: data });
    } catch (error) {
        console.log('error:', error.message);
    }
}

export const getUserPosts = (userId) => async (dispatch) => {
    try {

        const { data } = await api.getUserPosts(userId)

        dispatch({ type: GET_USER_POSTS, payload: data });
    } catch (error) {
        console.log('error:', error.message);
    }
}

export const followUser = (userId, postCreator) => async (dispatch) => {
    try {
        const followData = { userId, postCreator }
        const { data } = await api.followUser( followData )

        dispatch({ type: FOLLOWING, payload: data });
    } catch (error) {
        console.log('error:', error.message);
    }
}

export const getFollowing = (userId) => async (dispatch) => {
    try {
        console.log (`userId: ${userId}`);
        const { data } = await api.getFollowing( userId )

        dispatch({ type: GET_FOLLOWING, payload: data });

    } catch (error) {
        console.log('error:', error);
    }
}

// export default getFavoritePosts