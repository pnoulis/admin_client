import React, {useReducer, useContext} from "react";
import {reduceFields, reduceFieldErrors} from "lib/input";

const
ACTIONS = {
  setErrors: (fieldErrors) => {return {type: "SET_ERRORS", fieldErrors};},
  setInput: (name, value) => {return {type: "SET_INPUT", name, value};},
  toggle: (operation) => {return {type: "TOGGLE", operation};},
  edit: (toggle) => {return {type: "EDIT", toggle};},
  refreshForm: (initialState) => {return {type: "REFRESH_FORM", initialState};},
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "SET_ERRORS":
    return {...state, toggled: false, fieldErrors: action.fieldErrors, edit: true};
  case "SET_INPUT":
    return {
      ...state,
      fields: reduceFields(state.fields, action.name, action.value),
      fieldErrors: reduceFieldErrors(state.fieldErrors, action.name, action.value),
    };
  case "TOGGLE":
    return {...state, toggled: action.operation};
  case "EDIT":
    return {...state, toggled: action.toggle, edit: action.toggle};
  case "REFRESH_FORM":
    return action.initialState;
  default:
    return state;
  }
},
useForm = (initialState) => {
  const
  [state, dispatch] = useReducer(REDUCER, initialState),
  proxy = (action, ...payload) => dispatch(ACTIONS[action](...payload, initialState));
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
