import React, {useReducer, useContext} from "react";
import {FLASH_MESSAGE_STORE} from "./flashMessages";
import {USER_STORE} from "./user";

const
ACTIONS = {
  ...FLASH_MESSAGE_STORE.ACTIONS,
  ...USER_STORE.ACTIONS,
  getSession: (session) => {return {type: "GET_SESSION", session};},
  forceRedraw: () => {return {type: "FORCE_REDRAW"};},
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "GET_SESSION":
    return {...state, user: action.session, initialized: true};
  case "FORCE_REDRAW":
    return {...state, key: state.key + 1};
  default:
    return {
      ...state,
      flashMessages: FLASH_MESSAGE_STORE.REDUCER(state.flashMessages, action),
      user: USER_STORE.REDUCER(state.user, action)
    };
  }
},
APP_SCHEMA = {
  // begins with:
  key: 0,
  flashMessages: [],
  user: {
    loggedIn: false,
    // things that are added in the process are:
    //shoppingCart: {},
    //address: {},
    //token: {},
  },
},
useApp = () => {
  const
  [state, dispatch] = useReducer(REDUCER, APP_SCHEMA),
  proxy = (action, ...payload) => dispatch(ACTIONS[action](...payload));
  return {app: state, setApp: proxy};
},
appContext = React.createContext({
  app: {},
  setApp: () => {},
}),
useAppContext = () => useContext(appContext),
APP_STORE = {
  appContext,
  useAppContext,
  useApp,
};
export {APP_STORE};
