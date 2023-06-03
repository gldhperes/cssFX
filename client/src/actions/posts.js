// import { post } from 'request';
import { CREATE, FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, UPDATE, DELETE, LIKE, FAVORITE } from '../constants/actionTypes';
import * as api from '../api'


// ACTION CREATORS
export const getPost = (id) => async(dispatch) => {

    try {
        dispatch({ type: START_LOADING })

        // Espera o retorno do api.fetch
        const { data } = await api.fetchPost(id) 

        dispatch( { type: FETCH_POST, payload: data } ) ;

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log( error );       
    }
}

export const getPosts = () => async(dispatch) => {

    try {
        dispatch({ type: START_LOADING })

        // Espera o retorno do api.fetch
        const { data } = await api.fetchPosts() 

        dispatch( { type: FETCH_ALL, payload: data } ) ;

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log( error );       
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {

    try {
        dispatch({ type: START_LOADING })

        console.log("Pesquisa: ", searchQuery.searchPost + " " + searchQuery.tags);

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery) 

        dispatch( { type: FETCH_BY_SEARCH, payload: data } ) ;
        dispatch({ type: END_LOADING })
        console.log( data );  
    } catch (error) {
        console.log( error );       
    }
}

export const createPost = (post) => async(dispatch) => {

    try {
        const { data } = await api.createPost(post) 

        dispatch( { type: CREATE, payload: data } ) ;
    } catch (error) {
        console.log( error );       
    }
}

export const updatePost = (id, post) => async(dispatch) => {

    try {
        const { data } = await api.updatePost(id, post)

        dispatch( { type: UPDATE, payload: data } ) ;
    } catch (error) {
        console.log( error );       
    }
}

export const deletePost = (id) => async(dispatch) => {

    try {
        await api.deletePost(id)

        dispatch( { type: DELETE, payload: id } ) ;
    } catch (error) {
        console.log( error );       
    }
}

export const likePost = (id) => async(dispatch) => {

    try {
        const { data } = await api.likePost(id)

        dispatch( { type: LIKE, payload: data } ) ;
    } catch (error) {
        console.log( error );       
    }
}

export const favoritePost = (userId, postId) => async(dispatch) => {
    try {
        const { data } = await api.favoritePost(userId, postId)
        
        console.log( `data recebido favoritePost: ${ data }`);
        console.log( "dispatch favoritePost: ", dispatch( { type: FAVORITE, payload: data } ) );
    } catch (error) {
        console.log('error:', error.message);      
    }
}

