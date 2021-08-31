/* USED BY THE APP FILE */
const
ACTIONS = {
  addFlash: (flashMessage) => {return {type: "ADD_FLASH", flashMessage};},
  removeFlash: (flashId) => {return {type: "REMOVE_FLASH", flashId};},
},

REDUCER = (state, action) => {
  switch (action.type) {
  case "ADD_FLASH":
    if (state.some(fm => fm.flashId === action.flashMessage.flashId)) {
      return state;
    } else {
      return [...state, action.flashMessage];
    }
  case "REMOVE_FLASH":
    return state.filter(fm => fm.flashId !== action.flashId);
  default:
    return state;
  }
},
FLASH_MESSAGE_STORE = {
  ACTIONS,
  REDUCER,
};
export {FLASH_MESSAGE_STORE};
