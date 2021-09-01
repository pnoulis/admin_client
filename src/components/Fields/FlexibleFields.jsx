import {decode} from "html-entities";
import {useRef, useEffect, useState} from "react";
import {FORM_STORE} from "lib/stores";
import {useStyle, useFocus} from "lib/hooks";
import style from "./styles/flexibleField_0.module.scss";
const {useFormContext} = FORM_STORE;


export function FlexibleField_0({name, disabled}) {
  const
  {fields, edit, setForm} = useFormContext(),
  thisRef = useRef();

  function handleInput(e) {
    setForm("setInput", name, decode(e.target.innerHTML));
  }

  useEffect(() => {
    if (disabled) return;
    const selection = window.getSelection();
    if (fields[name]) selection.collapse(thisRef.current, 1);
  }, [fields[name]]);

  return (
    <div className={style.textField}>
      <span
        ref={thisRef}
        className={style.editable}
        contentEditable={disabled ? false : edit}
        onInput={handleInput}
        dangerouslySetInnerHTML={{__html: fields[name]}}
      >
      </span>
    </div>
  );
}
