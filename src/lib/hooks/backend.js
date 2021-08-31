// third party
import {useState, useEffect} from "react";
import ReactLoading from "react-loading";
// own - utilities
import backend from "lib/backend";

export {useBackend, renderStatus};
/*
  This hook requires multiple components and utilities to function
 */

function Success({userStyle}) {
  const style = {
    outer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imgContainer: {
      width: "50px",
      height: "50px",
      ...userStyle,
    },
    img: {
      display: "inline-block",
      width: "100%",
      height: "100%",
    }
  };
  return (
    <article style={style.outer}>
      <p style={style.imgContainer}>
        <img style={style.img} src="/tick.png" alt="fetch-success-icon"/>
      </p>
    </article>
  );
}

function Loading({userStyle}) {
  const style = {
    outer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imgContainer: {
      width: "50px",
      height: "50px",
      ...userStyle,
      color: "inherit",
    },
  };

  return (
    <article style={style.outer}>
      <div style={style.imgContainer}>
        <ReactLoading
          type="spinningBubbles"
          color={userStyle.color || "#1e90ff"}
          height="100%"
          width="100%"
        />
      </div>
    </article>
  );
}

const
success = (userStyle) => <Success userStyle={userStyle}/>,
loading = (userStyle) => <Loading userStyle={userStyle || {}}/>,
requestStatus = (req, res, resetRequest) => {
  if (!req) return null;
  else if (res) return success;
  else return loading;
},
useBackend = () => {
  const
  [req, setRequest] = useState(false),
  [res, setResponse] = useState(false),
  [payload, setPayload] = useState(null);

  useEffect(() => {
    if (!req) return;
    setTimeout(async () => setResponse(await backend[req.method]({...req})), 1500);
  }, [req]);

  useEffect(() => {
    if (!res) return null;
    setTimeout(() => setRequest(false), 1500);
    // if (!res.ok && res.err) return setTimeout(() => Router.push(res.payload.redirect), 2000);
    setTimeout(() => setPayload(res), 1700);
  }, [res]);

  return {
    setReq: (req) => setRequest(req),
    status: requestStatus(req, res),
    res: payload,
  };
},
renderStatus = (status, ...args) => {
  if (!status) return null;
  return (status.name === "loading") ?
    status(args[0] || {}) :
    status(args[1] || {});
};
