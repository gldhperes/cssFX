import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'})

// ACONTECE EM QUALQUER REQUEST
API.interceptors.request.use( (req) => {
    const profile = JSON.parse(localStorage.getItem('profile'));

    if( profile ){    
        req.headers.Authorization = `Bearer ${profile.token}`
    }

    return req
})

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost)
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const signIn = (formData) => API.post(`/user/signin`, formData)
export const signUp = (formData) => API.post(`/user/signup`, formData)
export const googleSignIn = (profileObj) => API.post(`/user/googlesignin`, profileObj)

export const favoritePost = (userId , postId) => API.patch(`/user/${userId}/favoritePost`, postId)
export const getFavoritePosts = (userId) => API.get(`/user/${userId}/favoritePosts`)
export const getUserPosts = (userId) => API.get(`/user/${userId}/userPosts`)
export const followUser = ( followData ) => API.post(`/user/follow`, followData)
export const getFollowing = (userId) => API.get(`/user/${userId}/following`)
export const getLikedsPosts = (userId) => API.get(`/user/${userId}/likeds` )
export const getUserProfile = (userId) => API.get(`/user/${userId}/profile`)

