import { FAVORITE, GET_FAVORITE, GET_USER_POSTS } from '../constants/actionTypes';

const userReducer = ( state = { favoritedPosts: [], userPosts: [] }, action ) => {
    switch (action.type) {
        case GET_FAVORITE:
            // console.log("GET_FAVORITE REDUX:", action.payload.favPost);
           
            const x = {
                ...state,
                favoritedPosts: action.payload.favPost,
                // favoritedPosts: [ ...state.favoritedPosts, action.payload.favPost ],
            } 

            // console.log("x REDUX:", x);

            return x

        case FAVORITE:
            // console.log(`FAVORITE REDUX: ${ action.payload.favPost }`);
           
            const y = {
                ...state,
                favoritedPosts: action.payload.favPost,
                // favoritedPosts: [ ...state.favoritedPosts, action.payload.favPost ],
            } 
            
            return y

        case GET_USER_POSTS:

            console.log(`GET_USER_POSTS REDUX: ${ action.payload._userPosts }`);
            return{
                ...state,
                userPosts: action.payload._userPosts,
            }

        default:
            return state;
    }
}

export default userReducer