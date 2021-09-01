import fetch from "node-fetch";
import AbortController from "abort-controller";

const
FILE_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/tiff",
  "image/bmp",
],
isImage = (object) => {
  if (!("type" in object)) return false;
  if (FILE_FORMATS.some(format => format === object.type)) return true;
},
BACKEND_HOST = "http://localhost:4006/api",
REQ_TIMEOUT = 10000; // 10 seconds

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.name = response.statusText;
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function errors(err)  {
  if (err.name === "Not Found") {
    return {ok: false, payload: {redirect: "/404"}};
  } else {
    return {ok: false, payload: {redirect: "/500"}};
  }
}

function constructUrl(path, params) {
  const domain = BACKEND_HOST.concat("", path),
        url = new URL(domain);

  if (!params) return url;
  Object.keys(params).forEach(param => {
    url.searchParams.append(param, params[param]);
  });
  return url;
}

function makeHeaders(isFile) {
  if (isFile) return {
    "Accept": "application/json",
  }; else return {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };
}

function encodeMulti(payload) {
  let formData = new FormData();
  Object.entries(payload).forEach(([key, val]) => {
    if (typeof val === "object" && key !== "img") val = JSON.stringify(val);
    formData.set(key, val);
  });
  return formData;
}

const backend = {
  get({url, payload, params}) { // READ
    const abController = new AbortController(),
          timeout = setTimeout(
            () => abController.abort(),
            REQ_TIMEOUT);

    url = constructUrl(url, params);
    return fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      signal: abController.signal,
      credentials: "include",
    }).then(checkStatus)
      .then(parseJSON)
      .catch(errors)
      .finally(() => clearTimeout(timeout));
  },
  post({url, payload, params}) { // CREATE
    let file = false;
    if (payload.img && isImage(payload.img)) file = true;
    const abController = new AbortController(),
          timeout = setTimeout(
            () => abController.abort(),
            REQ_TIMEOUT);

    url = constructUrl(url, params);
    return fetch(url, {
      method: "post",
      body: file ? encodeMulti(payload) : JSON.stringify(payload),
      headers: makeHeaders(file),
      signal: abController.signal,
      credentials: "include",
    }).then(checkStatus)
      .then(parseJSON)
      .catch(errors)
      .finally(() => clearTimeout(timeout));
  },
  delete({url, payload, params}) { // DELETE
    const abController = new AbortController(),
          timeout = setTimeout(
            () => abController.abort(),
            REQ_TIMEOUT);

    url = constructUrl(url, params);
    return fetch(url, {
      method: "delete",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      signal: abController.signal,
      credentials: "include",
    }).then(checkStatus)
      .then(parseJSON)
      .catch(errors)
      .finally(() => clearTimeout(timeout));
  },
  put({url, payload, params}) { // UPDATE
    let file = false;
    if (payload.img && isImage(payload.img)) file = true;
    const abController = new AbortController(),
          timeout = setTimeout(
            () => abController.abort(),
            REQ_TIMEOUT);

    url = constructUrl(url, params);
    return fetch(url, {
      method: "put",
      body: file ? encodeMulti(payload) : JSON.stringify(payload),
      headers: makeHeaders(file),
      signal: abController.signal,
      credentials: "include",
    }).then(checkStatus)
      .then(parseJSON)
      .catch(errors)
      .finally(() => clearTimeout(timeout));
  }
};

export default backend;


