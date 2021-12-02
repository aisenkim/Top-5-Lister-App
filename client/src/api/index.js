/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createTop5List = (payload) => api.post(`/top5list/`, payload)
export const getAllTop5Lists = () => api.get(`/top5lists/`)
export const getTop5ListPairs = (toolMenu, sortMenu) => api.get(`/top5listpairs?toolMenu=${toolMenu}&sortMenu=${sortMenu}`)
export const updateTop5ListById = (id, payload) => api.put(`/top5list/${id}`, payload)
export const deleteTop5ListById = (id) => api.delete(`/top5list/${id}`)
export const getTop5ListById = (id) => api.get(`/top5list/${id}`)
export const getTop5ListByTitle = (title, userId) => api.get(`/top5list/title?listTitle=${title}&userId=${userId}`)

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logoutUser = () => api.get(`/logout/`)

export const createComment = (payload) => api.post('/comments', payload)
export const getComments = (listId) => api.get(`/comments?listId=${listId}`)
export const deleteTop5ListComments = (listId) => api.delete(`/comments?listId=${listId}`)

export const getCommunityListById = (id) => api.get(`/communityList/${id}`)
export const getCommunityLists = () => api.get(`/communityList/`)
export const createCommunityList = (payload) => api.post(`/communityList/`, payload)
export const updateCommunityListItems = (payload) => api.put(`/communityList/items`, payload)
export const updateCommunityListById = (id, payload) => api.put(`/communityList/${id}`, payload)
export const deleteCommunityListItemIfEmpty = (deleteListName) => api.delete(`/communityList?listName=${deleteListName}`)

const apis = {
    createTop5List,
    getAllTop5Lists,
    getTop5ListPairs,
    updateTop5ListById,
    deleteTop5ListById,
    getTop5ListById,
    getTop5ListByTitle,

    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,

    createComment,
    getComments,
    deleteTop5ListComments,

    createCommunityList,
    getCommunityLists,
    getCommunityListById,
    updateCommunityListById,
    updateCommunityListItems,
    deleteCommunityListItemIfEmpty
}

export default apis
