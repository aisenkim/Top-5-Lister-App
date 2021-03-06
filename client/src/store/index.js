import {createContext, useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api, {deleteCommunityListItemIfEmpty, getTop5ListByTitle} from '../api'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_CURRENT_LIST_COMMENTS: "SET_CURRENT_LIST_COMMENTS",
    SET_SEARCH_TEXT: "SET_SEARCH_TEXT",
    SET_TOOL_MENU: "SET_TOOL_MENU",
    CHECK_LIST_TITLE: "CHECK_LIST_TITLE",
    SET_COMMUNITY_LIST: "SET_COMMUNITY_LIST"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        currentListComments: [],
        searchText: "",
        toolMenu: "home",
        hasSameTitle: null,
        communityLists: []
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const {auth} = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const {type, payload} = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            case GlobalStoreActionType.CHECK_LIST_TITLE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: payload,
                    communityLists: store.communityLists
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload.pairsArray,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: payload.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            // SET CURRENT LIST'S COMMENTS FOR RENDERING
            case GlobalStoreActionType.SET_CURRENT_LIST_COMMENTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: payload,
                    searchText: store.searchText,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            // SET CURRENT LIST'S COMMENTS FOR RENDERING
            case GlobalStoreActionType.SET_SEARCH_TEXT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: payload,
                    toolMenu: store.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            // SET CURRENT LIST'S COMMENTS FOR RENDERING
            case GlobalStoreActionType.SET_TOOL_MENU: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: payload,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: store.communityLists
                });
            }
            case GlobalStoreActionType.SET_COMMUNITY_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentListComments: store.currentListComments,
                    searchText: store.searchText,
                    toolMenu: payload.toolMenu,
                    hasSameTitle: store.hasSameTitle,
                    communityLists: payload.communityLists
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;

            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }

                    getListPairs(top5List);
                }
            }

            updateList(top5List);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });

        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["", "", "", "", ""],
            ownerEmail: auth.user.email,
            ownerName: auth.user.firstName + " " + auth.user.lastName,
            views: 0,
            like: [],
            dislike: [],
            published: false // TODO - GET PARAMETER AND SET TRUE OR FALSE
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            tps.clearAllTransactions();
            let newList = response.data.top5List;
            storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newList
                }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        } else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.createCommunityList = async function () {
        let communityItems = []
        let counter = 5; // FOR POINT SYSTEM (5,4,3,2,1)
        store.currentList.items.forEach((item, idx) => {
            communityItems.push({name: item, points: counter})
            counter -= 1;
        })
        const payload = {
            name: store.currentList.name,
            items: communityItems,
            views: 0,
            like: [],
            dislike: []
        }
        const response = await api.createCommunityList(payload);
    }

    store.getCommunityLists = async function (toolMenu, sort) {
        let response = await api.getCommunityLists(sort);
        if (response.data.success) {
            const communityLists = response.data.communityLists;
            storeReducer({
                type: GlobalStoreActionType.SET_COMMUNITY_LIST,
                payload: {communityLists, toolMenu}
            })
        } else {
            console.log("API FAILED TO GET THE COMMUNITY LISTS")
        }
    }

    store.getCommunityListById = async function (id) {
        const response = await api.getCommunityListById(id);
        // if(response.data.success) {
        //    response.data.communityList.items.forEach(item => {
        //        items.push(item.name)
        //    })
        //     response.data.communityList.items = items;
        // }
        return response.data.communityList;
    }

    store.setCommunityListToolMenu = function (toolMenu) {
        storeReducer({
            type: GlobalStoreActionType.SET_TOOL_MENU,
            payload: toolMenu
        })
    }

    store.updateCommunityListItems = async function(deleteListName, deleteListItems) {
        const payload = {
            deleteListName,
            deleteListItems
        }
        const response = await api.updateCommunityListItems(payload);
        if (response.data.success) {
            console.log("Success")
        } else {
            console.log("API FAILED TO UPDATE THE COMMUNITY LISTS")
        }
    }

    store.deleteCommunityListItemIfEmpty = async function (deleteListName) {
        const response = await api.deleteCommunityListItemIfEmpty(deleteListName)
        if (response.data.success) {
            console.log("Success")
        } else {
            console.log("API FAILED TO DELETE THE COMMUNITY LISTS")
        }
    }

    /**
     * THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
     * GETS TOP5LIST OF CURRENTLY LOGGED IN USER (FOR HOME MENU)
     * @param toolMenu - home, all, users (query param for getTop5ListPairs)
     * @param sort - 0: publish newest, 1: publish oldest, 2: views, 3: likes, 4: dislikes
     */
    store.loadIdNamePairs = async function (toolMenu, sort) {
        const response = await api.getTop5ListPairs(toolMenu, sort);
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: {pairsArray, toolMenu}
            });
        } else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.setToolMenu = function(toolMenu) {
        storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: {pairsArray: store.idNamePairs, toolMenu}
        });
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs(store.toolMenu, "-createdAt");
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.addMoveItemTransaction = function (start, end) {
        let transaction = new MoveItem_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addUpdateItemTransaction = function (index, newText) {
        let oldText = store.currentList.items[index];
        let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
        tps.addTransaction(transaction);
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        } else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }


    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    store.updateTop5ListTitle = async function (title) {
        // const sameTitleList = await api.getTop5ListByTitle(title)
        // console.log(sameTitleList)
        // if (sameTitleList.data.success) {
        //     storeReducer({
        //         type: GlobalStoreActionType.CHECK_LIST_TITLE,
        //         payload: sameTitleList.data.top5List
        //     });
        // }
        store.currentList.name = title;
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList)
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    store.checkHasTop5ListTitle = async function (title) {
        const sameTitleList = await api.getTop5ListByTitle(title, auth.user.email)
        if (sameTitleList.data.foundList) {
            return true
        } else {
            return false
        }
    }

    store.updateTop5ListPublishStatus = async function () {
        store.currentList.published = true;
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList)
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
        history.push("/");
    }

    store.updateCurrentListViews = async function (id, list) {
        list.views += 1
        const response = await api.updateTop5ListById(id, list)
        await store.loadIdNamePairs(store.toolMenu, "-createdAt")
    }

    store.updateCurrentListViewsCommunity = async function (id, list) {
        list.views += 1
        const response = await api.updateCommunityListById(id, list)
        await store.getCommunityLists(store.toolMenu)
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    store.setCurrentListComments = async function (listId) {
        const currentListComments = await api.getComments(listId);
        storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST_COMMENTS,
                payload: currentListComments
            }
        );
    }

    store.getListCommentsById = async function (listId) {
        const currentListComments = await api.getComments(listId);
        return currentListComments.data.comments;
    }

    /**
     * POST request to create comment
     */
    store.createComment = async function (listId, commentText) {
        let payload = {
            ownerName: auth.user.firstName + " " + auth.user.lastName,
            comment: commentText,
            listId: listId
        };

        const response = await api.createComment(payload);
        if (response.data.success) {
            // Get All Comments for list and Update
            const currentListComments = await api.getComments(listId);
            storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST_COMMENTS,
                    payload: currentListComments
                }
            );
        }
    }

    store.deleteListComments = async function (listId) {
        const response = await api.deleteTop5ListComments(listId);
        if (response.data.success) {
            store.loadIdNamePairs(store.toolMenu, "-createdAt");
        }
    }

    store.findListById = async function (id) {
        const result = await api.getTop5ListById(id);
        return result.data.top5List;
    }

    store.setSearchBarText = function (text) {
        storeReducer({
            type: GlobalStoreActionType.SET_SEARCH_TEXT,
            payload: text
        })
    }

    store.updateLike = function (shouldIncreaseLike) {
        if (shouldIncreaseLike)
            store.currentList.like += 1
        else
            store.currentList.like -= 1

        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList
        });
    }

    store.updateDislike = function (shouldIncreaseDislike) {
        if (shouldIncreaseDislike)
            store.currentList.dislike += 1
        else
            store.currentList.dislike -= 1

        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList
        });
    }

    store.updateLikeDislikeToServer = async function (listId, isLikeCounter, isDislikeCounter) {
        let response = await api.getTop5ListById(listId);
        if (response.data.success) {
            let top5List = response.data.top5List;
            // ONLY UPDATE LIKE IF USER HASN'T ALREADY LIKED
            if (isLikeCounter === 1 && !top5List.like.includes(auth.user.email)) {
                top5List.like.push(auth.user.email)
            } else if (isLikeCounter === -1) {
                top5List.like = top5List.like.filter((email) => email !== auth.user.email);
            }

            if (isDislikeCounter === 1 && !top5List.dislike.includes(auth.user.email)) {
                top5List.dislike.push(auth.user.email)
            } else if (isDislikeCounter === -1) {
                top5List.dislike = top5List.dislike.filter((email) => email !== auth.user.email);
            }

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                await store.loadIdNamePairs(store.toolMenu, "-createdAt")
            }
        }
    }

    store.updateLikeDislikeCommunityListToServer = async function (listId, isLikeCounter, isDislikeCounter, userEmail) {
        let response = await api.getCommunityListById(listId);
        if (response.data.success) {
            let communityList = response.data.communityList;

            if (isLikeCounter === 1) {
                communityList.like.push(userEmail)
            } else if (isLikeCounter === -1) {
                communityList.like = communityList.like.filter((email) => email !== auth.user.email);
            }

            if (isDislikeCounter === 1) {
                communityList.dislike.push(userEmail)
            } else if (isDislikeCounter === -1) {
                communityList.dislike = communityList.dislike.filter((email) => email !== auth.user.email);
            }

            response = await api.updateCommunityListById(communityList._id, communityList);
            if (response.data.success) {
                await store.getCommunityLists(store.toolMenu)
            }
        }
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export {GlobalStoreContextProvider};