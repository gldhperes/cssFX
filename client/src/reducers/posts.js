import { CREATE, FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

const postReducer = (state = { isLoading: true, posts: []}, action) => {
    // const reducer = ( state = [], actions)
    // Em Redux o 'state' sempre tem q ser igual à alguma coisa

    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case END_LOADING:
            return {
                ...state,
                isLoading: false,
            }

        case FETCH_POST:
            console.log(`FETCH ONE POST: ${FETCH_POST} -> ${action.payload}`);
            return {
                ...state,
                post: action.payload,
                isLoading: false,
            }

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }


        case FETCH_BY_SEARCH:
            console.log(`FETCH_BY_SEARCH: ${FETCH_BY_SEARCH} -> ${action.payload}`);
            return {
                ...state,
                posts: action.payload,
            }

        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            }

        case CREATE:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }

        case UPDATE:
            console.log("UPDATE", action.payload);

            return {
                ...state,
                posts: state.posts.map((post) =>
                    (post._id === action.payload._id) ? (
                        console.log(post._id),
                        action.payload
                    ) : (
                        post
                    )
                )
            }

        case DELETE:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            }

        default:
            return state;
    }
}

export default postReducer