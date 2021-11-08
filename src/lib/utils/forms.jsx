import {validateInput} from "lib/input";
import {useState} from "react";

const
isFormReady = (fields) => {
  let fieldErrors = {};
  Object.keys(fields).forEach(field => {
    fieldErrors[field] = validateInput(field, fields[field]);
  });


  if ("confirmPassword" in fields &&
      fields.confirmPassword !== fields.password) {
    fieldErrors.confirmPassword = "passwords do not match";
  }

  return {ready: !Object.values(fieldErrors).some(el => el), fieldErrors};
},
confirmPassword = (confirm, password) => {
  if (!confirm || !password) return false;
  if (confirm !== password) return true;
},
usePassword = (type, style) => {
  const
  images = ["/close_fill_minimal.svg",
            "/open_fill_black_minimal.svg"],
  [reveal, setReveal] = useState(false);

  if (type !== "password") return {reveal: false, password: null};
  const
  password = (
    <div className={style} onClick={() => setReveal(!reveal)}>
      <img
        src={reveal ? images[0] : images[1]}
        alt="show-hide-icon"
      />
    </div>
  );

  return {
    reveal,
    password,
  };
},
formStyleReducer = (params) => {
  let config = {};
  if ("edit" in params && !params.edit) return config;
  if (params.password) return config.password = true;
  if (params.edit) config.edit = true;
  if (params.focused || params.input) config.focused = true;
  if (params.input && params.error) config.invalid = true;
  if (!config.invalid && params.input) config.valid = true;
  if (params.error) config.error = true;
  return config;
},
ifErrors = fieldErrors => {
  const f = [];
  for (const err of Object.values(fieldErrors)) {
    err && f.push(err);
  }
  return f.length ? f : null;
};

export const FORM_UTILS = {
  ifErrors,
  isFormReady,
  confirmPassword,
  usePassword,
  formStyleReducer,
};
