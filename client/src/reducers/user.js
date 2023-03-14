import { FAVORITE, GET_FAVORITE } from '../constants/actionTypes';

const userReducer = ( state = { favoritedPosts: [] }, action ) => {
    switch (action.type) {
        case GET_FAVORITE:
            console.log("GET_FAVORITE REDUX:", state.favoritedPosts);

            let x = {
                ...state,
                favoritedPosts: state.favoritedPosts,
            } 

            console.log("x REDUX:", x);

            return x

        case FAVORITE:
            // console.log(`FAVORITE REDUX: ${ action.payload.favPost }`);
            return {
                ...state,
                favoritedPosts: action.payload.favPost,
            }

        default:
            return state;
    }
}

export default userReducer