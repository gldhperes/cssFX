import { START_LOADING, END_LOADING, FOLLOWING, GET_FOLLOWING, FETCH_USERS_BY_SEARCH, GET_USER_LIKED_POSTS, GET_FAVORITE, GET_USER_POSTS, GET_USER_PROFILE } from '../constants/actionTypes';
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

export const getLikedsPosts = (userId) => async (dispatch) => {
    try {
        console.log (`userId: ${userId}`);
        const { data } = await api.getLikedsPosts( userId )

        dispatch({ type: GET_USER_LIKED_POSTS, payload: data });

    } catch (error) {
        console.log('error:', error);
    }
}

export const getUserProfile = (userId) => async (dispatch) => {
    try {
        console.log (`userId: ${userId}`);

        const { data } = await api.getUserProfile( userId )

        dispatch({ type: GET_USER_PROFILE, payload: data})

     
    } catch (error) {
        console.log('GetUserProfile Error: ', error);
    }
}

export const getUsersBySearch = (searchQuery) => async(dispatch) => {

    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchUsersBySearch(searchQuery) 

        dispatch( { type: FETCH_USERS_BY_SEARCH, payload: data } ) ;

        dispatch({ type: END_LOADING })
        console.log( "users found: ", data );  
    } catch (error) {
        console.log( error );       
    }
}