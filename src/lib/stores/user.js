import backend from "lib/backend";
/* USED BY THE APP FILE */

const
ACTIONS = {
  login: (user) => {return {type: "LOGIN", user};},
  logout: () => {return {type: "LOGOUT"};},
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "LOGIN":
    setTimeout(() => window.location.reload(), action.user.timeOut);
    return action.user;
  case "LOGOUT":
    backend.delete({url: "/logout"}).then(() => setTimeout(() => window.location.reload(), 1500)).catch(err => alert(err));
    return state;
  default:
    return state;
  }
},
USER_STORE = {
  ACTIONS,
  REDUCER,
};
export {USER_STORE};
