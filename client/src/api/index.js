import axios from 'axios'

// LINK PARA O SERVIDOR
const URL = "https://cssfxserver.vercel.app/"
// const URL = "http://localhost:4444"

const API = axios.create({ baseURL: URL })

// ACONTECE EM QUALQUER REQUEST
API.interceptors.request.use((req) => {
    const profile = JSON.parse(localStorage.getItem('profile'));

    if (profile) {
        req.headers.Authorization = `Bearer ${profile.token}`
    }

    return req
})

export const fetchPosts = () => API.get(`/posts`)
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.searchPost || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost)
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const signIn = (formData) => API.post(`/user/signin`, formData)
export const signUp = (formData) => API.post(`/user/signup`, formData)
export const checkToken = () => API.get(`/user/checktoken`)
export const googleSignIn = (profileObj) => API.post(`/user/googlesignin`, profileObj)

export const favoritePost = (userId, postId) => API.patch(`/user/${userId}/favoritePost`, postId)
export const getFavoritePosts = (userId) => API.get(`/user/${userId}/favoritePosts`)
export const getUserPosts = (userId) => API.get(`/user/${userId}/userPosts`)
export const followUser = (followData) => API.post(`/user/follow`, followData)
export const getFollowing = (userId) => API.get(`/user/${userId}/following`)
export const getLikedsPosts = (userId) => API.get(`/user/${userId}/likeds`)
export const getUserProfile = (userId) => API.get(`/user/${userId}/profile`)
export const fetchUsersBySearch = (userName) => API.get(`/user/search?searchQuery=${userName || 'none'}`)
