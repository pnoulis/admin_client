import {useEffect} from "react";
import {FORM_STORE} from "lib/stores";
import {FORM_UTILS} from "lib/utils";
import {useTableContext, Row, Cell, renderErrors} from "./Table";
import {NotBeingEdited, BeingEdited} from "components/Fields";
import toggleStyle from "./toggles.module.scss";
const {useForm, formContext} = FORM_STORE;
const {ifErrors} = FORM_UTILS;


export default function FormRow({data}) {
  const
  {cellMap, formSchema} = useTableContext(),
  {form, setForm} = useForm(
    {...formSchema, fields: {...formSchema.fields, ...data},
     new: !data, toggled: !data && "edit", edit: !data && true}
  );

  return (
    <formContext.Provider value={{...form, setForm}}>
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
      {renderErrors(ifErrors(form.fieldErrors))}
    </formContext.Provider>
  );
}
