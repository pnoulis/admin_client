// own - utilities
import {FORM_STORE} from "lib/stores";
import {useHover, useInlineStyle} from "lib/hooks";

const {useFormContext} = FORM_STORE;

const styleReducer = (params) => {
  let config = {};
  if (params.hovered) config.hovered = true;
  if (params.active) config.active = true;
  return config;
};

export function NotBeingEdited({style = {}}) {
  return (
    <div className={style.notBeingEdited}>
      <Edit style={style}/>
      <Delete style={style}/>
    </div>
  );
}

export function BeingEdited({style = {}}) {
  return (
    <div className={style.beingEdited}>
      <Done style={style}/>
      <Cancel style={style}/>
    </div>
  );
}

export function Cancel({children, style = {}}) {
  const
  {setForm} = useFormContext(),
  {hovered, bindHover} = useHover(),
  setStyle = useInlineStyle({hovered}, styleReducer);

  return (
    <div
      className={style.cancel || ""}
      {...bindHover}
      onClick={() => setForm("toggle", "cancel")}>
      <p>
        {children || "cancel"}
      </p>
    </div>
  );
}

export function Edit({children, style = {}}) {
  const {setForm} = useFormContext();
  return (
    <div
      className={style.edit || ""}
      onClick={() => setForm("toggle", "edit")}>
      <p>
        {
          children ||
            <img src="/edit.png" alt="pencil-icon"/>
        }
      </p>
    </div>
  );
}

export function Delete({children, style = {}}) {
  const {setForm} = useFormContext();
  return (
    <div
      className={style.delete || ""}
      onClick={() => setForm("toggle", "delete")}>
      <p>
        {
          children ||
            <img src="/delete.png" alt="garbage-bin-icon"/>
        }
      </p>
    </div>
  );
}

export function Done({children, style = {}}) {
  const {setForm} = useFormContext(),
        {hovered, bindHover} = useHover(),
        setStyle = useInlineStyle({hovered}, styleReducer);

  return (
    <div
      className={style.done || ""}
      {...bindHover}
      onClick={() => setForm("toggle", "done")}>
      <p>
        {children || "done"}
      </p>
    </div>
  );
}
