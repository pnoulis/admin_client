import {useEffect} from "react";
import {useBackend, renderStatus} from "lib/hooks";
import {PANEL_STORE, APP_STORE, FORM_STORE} from "lib/stores";
import {FORM_UTILS} from "lib/utils";
import {useTableContext, Row, Cell} from "./Table";
import {NotBeingEdited, BeingEdited} from "components/Fields";
import toggleStyle from "./toggles.module.scss";
import styled from "styled-components";
const {ifErrors, isFormReady} = FORM_UTILS;

const
Error = styled.p`
width: max-content;
margin: auto;
font-size: var(--font-size-2large);
color: var(--color-error);
padding: 5px 0;
font-weight: bold;
`,
RenderThis = ({children}) => {
  if (!children) return null;
  return (
    <Row span>{children}</Row>
  );
},
renderErrors = errs => errs ? errs.map((err, i) => <Error key={i}>{err}</Error>) : null;

export default function FormRow({notify, data, edit}) {
  const
  {setApp} = APP_STORE.useAppContext(),
  {setPanel} = PANEL_STORE.usePanelContext(),
  {cellMap, target, formSchema} = useTableContext(),
  {form, setForm} = FORM_STORE.useForm(
    {...formSchema, fields: {...formSchema.fields, ...data},
     new: !data,  edit}
  ),
  {setReq, status, res} = useBackend();

  console.log(form);

  useEffect(() => {
    if (status || !form.toggled) return null;
    if (notify) notify(form.toggled);

    switch (form.toggled) {
    case "edit":
      setForm("edit", true);
      break;
    case "cancel":
      setForm("refreshForm");
      break;
    case "delete":
      if (form.new) return null;

      setTimeout(() => setReq({method: "delete", url: target, payload: {id: form.fields._id}}), 500);
      break;
    case "done":
      const {ready, fieldErrors} = isFormReady(form.fields);
      if (!ready) return setForm("setErrors", fieldErrors);
      setForm("edit", false);

      if (form.new) {
        setTimeout(() => setReq({method: "post", url: target, payload: form.fields}), 500);
      } else {
        setTimeout(() => setReq({method: "put", url: target, payload: form.fields}), 500);
      }
      break;
    default:
      return null;
    }

  }, [form.toggled]);


  useEffect(() => {
    if (!res) return null;
    const payload = res.payload;
    if (!res.ok) setForm("edit", true);
    if (payload.fieldErrors) return setTimeout(() => setForm("setErrors", payload.fieldErrors), 1000);
    if (!res.ok && payload.flashMessage) setTimeout(() => setApp("addFlash", {flashId: payload.flashMessage}), 1000);

    if (res.ok) {
      setPanel("setData", payload);
    }
  }, [res]);

  return (
    <FORM_STORE.formContext.Provider value={{...form, setForm}}>
      <Row>
        {Object.keys(cellMap).map((h, i) => {
          return (
            <Cell key={i}>
            {typeof cellMap[h] === "function" ?
             cellMap[h]() :
             cellMap[h]}
            </Cell >
          );
        })}
        <Cell key={Object.keys(form.fields).length}>
          {form.edit ? <BeingEdited style={toggleStyle}/> :
           <NotBeingEdited style={toggleStyle}/>}
        </Cell>
      </Row>
      {<RenderThis>{renderErrors(ifErrors(form.fieldErrors)) || renderStatus(status)}</RenderThis>}
    </FORM_STORE.formContext.Provider>
  );
}
