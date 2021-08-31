import React, {useReducer, useContext} from "react";
const
ACTIONS = {
  mountComponent: (component) => {return {type: "MOUNT_COMPONENT", component};},
  setData: (data) => {return {type: "SET_DATA", data};},
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "MOUNT_COMPONENT":
    return {...state, component: action.component};
  case "SET_DATA":
    return {...state, data: action.data};
  default:
    return state;
  }
},
usePanel = (initialState) => {
  const
  [state, dispatch] = useReducer(REDUCER, initialState),
  proxy = (action, ...payload) => dispatch(ACTIONS[action](...payload));

  return {panel: state, setPanel: proxy};
},
panelContext = React.createContext({
  panel: {},
  setPanel: () => {},
}),
usePanelContext = () => useContext(panelContext),
PANEL_STORE = {
  panelContext,
  usePanelContext,
  usePanel
};
export {PANEL_STORE};

