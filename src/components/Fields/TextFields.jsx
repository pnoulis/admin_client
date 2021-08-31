// own - utilities
import {FORM_STORE} from "lib/stores";
import {FORM_UTILS} from "lib/utils";
import {useStyle, useFocus} from "lib/hooks";
// styles
import style from "./styles/textField_0.module.scss";
import style1 from "./styles/textField_1.module.scss";

const {useFormContext} = FORM_STORE,
      {usePassword, confirmPassword, formStyleReducer} = FORM_UTILS;

export
function TextField_0({type, clientName, name, required}) {
  const {fields, edit, fieldErrors, setForm} = useFormContext(),
        {reveal, password} = usePassword(type, style.password),
        {focused, bindFocus} = useFocus(),
        setStyle = useStyle(style,
                            {focused, input: fields[name], error: (name === "confirmPassword") ? confirmPassword(fields[name], fields.password) : fieldErrors[name]},
                    formStyleReducer);

  function handleInput(e) {
    e.preventDefault();
    if (!edit) return null;
    setForm("setInput", name, e.target.value);
  }

  return (
    <div className={style.textField} {...bindFocus}>
      <label className={setStyle(["focused", "valid", "invalid",], style.label)} htmlFor={name}>
        {clientName || name.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(' ')}
        <span className={style.requiredStar}>{required && "*"}</span>
      </label>
      <input
        type={(type === "password" && reveal) ? "text" : type || "text"}
        id={name}
        value={fields[name]}
        onChange={handleInput}
        autoComplete="off"
        className={setStyle(["focused", "valid", "invalid", "customStyle"], style.input)}
      />
      {password}
      <span className={setStyle(["focused", "valid", "invalid"], style.optional)}>
        {required ? "" : "optional"}
      </span>
      <span className={style.errorMessage}>
        {fieldErrors[name]}
      </span>
    </div>
  );
};

export
function TextField_1({type, clientName, name, disabled}) {
  const {fields, edit, fieldErrors, setForm} = useFormContext(),
        {reveal, password} = usePassword(type, style1.password),
        {focused, bindFocus} = useFocus(),
        setStyle = useStyle(style1,
                            {focused, edit, input: fields[name], error: fieldErrors[name]},
                            formStyleReducer);

  function handleInput(e) {
    e.preventDefault();
    if (!edit) return null;
    setForm("setInput", name, e.target.value);
  }

  return (
    <div className={style1.textField} {...bindFocus}>
      <label className={setStyle(["focused", "valid", "invalid"], style1.label)} htmlFor={name}>
        {clientName || name.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(' ') + ":"}
      </label>
      <input
        type={(type === "password" && reveal) ? "text" : type || "text"}
        id={name}
        value={fields[name]}
        onChange={handleInput}
        autoComplete="off"
        disabled={disabled}
        className={setStyle(["focused", "valid", "invalid", "edit"], type === "password" ? style1.inputPassword : style1.input)}
      />
      {edit && password}
      <span className={setStyle(["error"], style1.errorMessage)}>
        {fieldErrors[name]}
      </span>
    </div>
  );

};
