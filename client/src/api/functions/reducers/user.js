import { FAVORITE, GET_FAVORITE, GET_USER_POSTS, GET_USER_LIKED_POSTS, FOLLOWING, GET_FOLLOWING, GET_USER_PROFILE, FETCH_USERS_BY_SEARCH } from '../../constants/actionTypes';

const userReducer = (state = { likedPosts: [], favoritedPosts: [], userPosts: [], following: [], userProfile: [], }, action) => {
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
            console.log(`${GET_FOLLOWING} REDUX: ${action.payload.followingUsers}`);
            return {
                ...state,
                following: action.payload.followingUsers,
            }

            case "GET_USER_FOLLOWING":
                console.log(`GET_USER_FOLLOWING REDUX: ${state.following}`);
                return {
                    ...state,
                    following: state.following,
                }

        case GET_USER_LIKED_POSTS:

            console.log(`${GET_USER_LIKED_POSTS} REDUX: ${action.payload.userLikedPosts}`);
            return {
                ...state,
                likedPosts: action.payload.userLikedPosts,
            }

        case GET_USER_PROFILE:

            console.log(`GET_USER_PROFILE: ${GET_USER_PROFILE} REDUX: ${action.payload.user}`);
            return {
                ...state,
                userProfile: action.payload.user,
            }

        case FETCH_USERS_BY_SEARCH:
            console.log(`FETCH_USERS_BY_SEARCH: ${FETCH_USERS_BY_SEARCH} REDUX: ${action.payload}`);
            return {
                ...state,
                posts: action.payload,
            }
        // case 'LOGOUT_USER_BY_EXPIRED_TIME':
        //     return {
        //         ...state,
        //         userProfile: action.payload.user,
        //     }

        default:
            return state;
    }
}

export default userReducer