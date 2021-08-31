import React, {useReducer, useContext} from "react";
import {reduceFields, reduceFieldErrors} from "lib/input";

const
ACTIONS = {
  setErrors: (fieldErrors) => {return {type: "SET_ERRORS", fieldErrors};},
  setInput: (name, value) => {return {type: "SET_INPUT", name, value};},
  toggle: (operation) => {return {type: "TOGGLE", operation};},
  edit: () => {return {type: "EDIT"};},
  refreshForm: (initialState) => {return {type: "REFRESH_FORM", initialState};},
  updateForm: () => {return {type: "UPDATE_FORM"};},
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "SET_ERRORS":
    return {...state, fieldErrors: action.fieldErrors, edit: true};
  case "SET_INPUT":
    return {
      ...state,
      fields: reduceFields(state.fields, action.name, action.value),
      fieldErrors: reduceFieldErrors(state.fieldErrors, action.name, action.value),
    };
  case "TOGGLE":
    return {...state, toggled: action.operation};
  case "EDIT":
    return {...state, toggled: "edit", edit: !state.edit};
  case "REFRESH_FORM":
    return action.initialState;
  case "UPDATE_FORM":
  default:
    return state;
  }
},
useForm = (initialState) => {
  const
  [state, dispatch] = useReducer(REDUCER, initialState),
  proxy = (action, ...payload) => {
    if (action !== "toggle") return dispatch(ACTIONS[action](...payload));
    if (payload[0] === "edit") return dispatch(ACTIONS.edit());
    if (payload[0] === "cancel") return dispatch(ACTIONS.refreshForm(initialState));
    dispatch(ACTIONS[action](...payload));
  };

  return {form: state, setForm: proxy};
},
formContext = React.createContext({
  form: {},
  setForm: () => {},
}),
useFormContext = () => useContext(formContext),
FORM_STORE = {
  formContext,
  useFormContext,
  useForm,
};
export {FORM_STORE};
