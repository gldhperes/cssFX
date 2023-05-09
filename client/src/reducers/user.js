import { FAVORITE, GET_FAVORITE, GET_USER_POSTS, FOLLOWING, GET_FOLLOWING, GET_USER_PROFILE } from '../constants/actionTypes';

const userReducer = (state = { favoritedPosts: [], userPosts: [], following: [], userProfile: [], }, action) => {
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

            console.log(`GET_USER_POSTS REDUX: ${action.payload._userPosts}`);
            return {
                ...state,
                userPosts: action.payload._userPosts,
            }

        case FOLLOWING:
            console.log(`FOLLOWING REDUX: ${action.payload.following}`);
            return {
                ...state,
                following: action.payload.following,
            }

        case GET_FOLLOWING:
            console.log(`${GET_FOLLOWING} REDUX: ${action.payload.userNames}`);
            return {
                ...state,
                following: action.payload.userNames,
            }


        case GET_USER_PROFILE:

            console.log(`GET_USER_PROFILE: ${GET_USER_PROFILE} REDUX: ${action.payload.user}`);
            return {
                ...state,
                userProfile: action.payload.user,
            }

        default:
            return state;
    }
}

export default userReducer