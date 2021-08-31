import ReactDOM from "react-dom";

export
const
mount = (element) => {
  ReactDOM.render(element, document.getElementById("main-content"));
};
