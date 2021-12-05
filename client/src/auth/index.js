import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import api from "../api";

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    LOGOUT_USER: "LOGOUT_USER",
    SET_ERROR_MESSAGE : "SET_ERROR MESSAGE",
    SET_IS_GUEST: "SET_IS_GUEST"
};

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: null,
        isGuest: false
    });
    const history = useHistory();

    useEffect(() => {
        try {
            auth.getLoggedIn();
        } catch (err) {
            console.log("User not logged in yet")
        }
    }, []);

    const authReducer = (action) => {
        const {type, payload} = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    isGuest: false
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    isGuest: false
                });
            }
            case AuthActionType.SET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    isGuest: false
                });
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false,
                    isGuest: false
                })
            }
            case AuthActionType.SET_ERROR_MESSAGE: {
                return setAuth( {
                    errorMessage: payload.errorMessage,
                })
            }
            case AuthActionType.SET_IS_GUEST: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    isGuest: payload.isGuest
                })
            }
            default:
                return auth;
        }
    };

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user,
                    },
                });
            } else {
                console.log("user not logged in");
            }
        } catch (err) {
            console.log("getLoggedIn Error: ", err);
        }
    };

    auth.registerUser = async function (userData, store) {
        try {
            const response = await api.registerUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user,
                        errorMessage: null
                    },
                });
                history.push("/");
                store.loadIdNamePairs("home", "-createdAt");
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                const errMessage = err.response.data.errorMessage;
                await authReducer({
                    type: AuthActionType.SET_ERROR_MESSAGE,
                    payload : {
                        errorMessage: errMessage,
                    }
                })
                console.log(auth.errorMessage)
            }
        }
    };

    auth.loginUser = async function (userData, store) {
        try {
            const response = await api.loginUser(userData);

            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user,
                    },
                });
                history.push("/");
                // store.loadIdNamePairs();
            }

            // TODO - HOW TO FIND A way to check status error here
        } catch (err) {
            if (err.response && err.response.status === 401) {
                const errMessage = err.response.data.errorMessage;
                await authReducer({
                    type: AuthActionType.SET_ERROR_MESSAGE,
                    payload : {
                        errorMessage: errMessage,
                    }
                })
                console.log(auth.errorMessage)
            } else {
                console.log("Error response status: ", err.response.status)
            }
        }
    };

    auth.logoutUser = async function () {
        try {
            const response = await api.logoutUser();

            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                    payload: {
                        user: null
                    }
                });
                history.push('/')
            }
        } catch (err) {
            console.log("LOGOUT: ", err)
        }

    }

    auth.setErrorMessageNull = function() {
        authReducer({
            type: AuthActionType.SET_ERROR_MESSAGE,
            payload: {
                errorMessage : null
            }
        })
    }

    auth.setGuest = function(isGuest) {
        authReducer({
            type: AuthActionType.SET_IS_GUEST,
            payload: {
                isGuest: isGuest
            }
        })
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );

}

export default AuthContext;
export {AuthContextProvider};
