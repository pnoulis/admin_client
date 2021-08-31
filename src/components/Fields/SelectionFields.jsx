import {useState, useEffect} from "react";
import {useHover, useStyle} from "lib/hooks";
import {FORM_STORE} from "lib/stores";
import style from "./styles/selector_0.module.scss";
const {useFormContext} = FORM_STORE;

const styleReducer = (params) => {
  let config = {};
  config.hovered = params.edit && params.hovered;
  config.selected = params.selected;
  return config;
};

function Selector({selected, name, children}) {
  const
  {hovered, bindHover} = useHover(),
  {edit, setForm} = useFormContext(),
  setStyle = useStyle(style, {edit, selected, hovered}, styleReducer);

  return (
    <span {...bindHover}
          className={setStyle(["selected", "hovered"], style.selector)}
          onClick={() => edit && setForm("setInput", name, children)}>
      {children}
    </span>
  );
}

function isSelected(selected, current) {
  if (selected instanceof Array) {
    if (selected.some(selected => selected === current)) return true;
    return false;
  }

  if (selected === current) return true;
  return false;
}

export function SelectionField({list, multiple, name, each}) {
  const
  [asyncList, setAsyncList] = useState([]),
  {fields} = useFormContext();

  useEffect(async () => {
    if ("then" in list) {
      const res = await list;
      if (!res.ok) return alert(`${name} could not be loaded, contact programmer`);
      const payload = (!(res.payload[0] instanceof Array)) ? res.payload.map(v => v[each]) :
            res.payload;
      setAsyncList(payload);
    } else setAsyncList(list);
  }, []);

  return (
    <article className={style.selectionField}>
      {asyncList.map((v, i) => (
        <Selector key={i} selected={isSelected(fields[name], v)} name={name}>
          {v}
        </Selector>
      ))}
    </article>
  );
}
