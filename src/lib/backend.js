import fetch from "node-fetch";
import AbortController from "abort-controller";

const
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
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
  }; else return {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };
}

function encodeMulti(payload) {
  let formData = new FormData();
  Object.entries(payload).forEach(([key, val]) => {
    if (typeof val === "object") {
      if (key !== "imgs") {
        val = JSON.stringify(val);
      }
      if (key === "imgs" && !payload.imgs.name) {
        val = JSON.stringify(val);
      }
    }
    formData.set(key, val);
  });
  return formData;
}

const backend = {
  get({url, payload, params, file}) { // READ
    const abController = new AbortController(),
          timeout = setTimeout(
            () => abController.abort(),
            REQ_TIMEOUT);

    url = constructUrl(url, params);
    return fetch(url, {
      method: "get",
      headers: makeHeaders(file),
      signal: abController.signal,
      credentials: "include",
    }).then(checkStatus)
      .then(parseJSON)
      .catch(errors)
      .finally(() => clearTimeout(timeout));
  },
  post({url, payload, params, file}) { // CREATE
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
  delete({url, payload, params, file}) { // DELETE
    const abController = new AbortController(),
          timeout = setTimeout(
            () => abController.abort(),
            REQ_TIMEOUT);

    url = constructUrl(url, params);
    return fetch(url, {
      method: "delete",
      body: JSON.stringify(payload),
      headers: makeHeaders(file),
      signal: abController.signal,
      credentials: "include",
    }).then(checkStatus)
      .then(parseJSON)
      .catch(errors)
      .finally(() => clearTimeout(timeout));
  },
  put({url, payload, params, file}) { // UPDATE
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


