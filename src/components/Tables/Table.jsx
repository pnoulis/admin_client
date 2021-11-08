import React, {useState, useEffect, createRef} from "react";
import {FORM_STORE} from "lib/stores";
import FormRow from "./FormRow";
import styled from "styled-components";

const S = {};
S.Table = styled.table`
font-size: var(--font-size-regular);
border-collapse: collapse;
position: relative;
height: max-content;
width: max-content;
`;
S.Header = styled.thead`
`;
S.NewRow = styled.div`
box-sizing: content-box;
width: min-content;
padding: 5px 10px;
margin: auto;
cursor: pointer;
img {
display: inline-block;
width: 45px;
height: 45px;
}
`;
S.Cell = styled.td`
font-size: var(--font-size-regular);
letter-spacing: 0.5px;
padding: 5px;
border: 2px solid white;
text-align: center;
width: 100%;
min-width: 70px;
height: 100%;

&:hover {
background-color: white;
}

${S.Header} & {
padding: 0 5px;
background-color: initial;
font-size: var(--font-size-large);
color: white;
text-transform: capitalize;
}


`;
S.Error = styled.p`
width: max-content;
margin: auto;
font-size: var(--font-size-2large);
color: var(--color-error);
padding: 5px 0;
font-weight: bold;
`;
S.Row = styled.tr`
background-color: var(--color-grey-phosSilver-4);

&:nth-of-type(even) {
background-color: var(--color-grey-phosSilver-2);
}

&:hover {
background-color: var(--color-primary);
}

${S.Header} & {
background-color: var(--color-primary);
}

`;

export
const
tableContext = React.createContext({
  body: [],
  headers: [],
  extra: {},
  cellMap: {},
  formSchema: {},
}),
useTableContext = () => React.useContext(tableContext),
renderErrors = (errors, length) => {
  if (!errors.some(el => !!el)) return null;
  return (
    <Row>
      <Cell colspan={length + 1}>
        {errors.map((err, i) => err && <S.Error key={i}>{err}</S.Error>)}
      </Cell>
    </Row>
  );
},
Header = ({header}) => {
  return (
    <S.Header>
      <Row>
        {header.map((heading, i) => <Cell key={i}>{heading}</Cell>)}
      </Row>
    </S.Header>
  );
},
Body = ({body}) => {
  return (
    <tbody>
      <NewRow key={0}/>
      {body.map((row, i) => <FormRow key={i + 1} data={row}/>)}
    </tbody>
  );
},
NewRow = () => {
  const
  {headers} = useTableContext(),
  [view, setView] = useState(false);

  function switchView(e) {
    e && e.stopPropagation();
    setView(!view);
  }

  if (view) return <FormRow notify={(toggle) => toggle === "cancel" && switchView()} edit/>;

  return (
    <Row span>
      <S.NewRow>
        <img onClick={switchView} src="/add_blue.png;" alt="plus-icon"/>
      </S.NewRow>
    </Row>
  );
},
Row = ({span, children}) => {
  const {headers} = useTableContext();

  if (span) return (
    <S.Row><Cell colspan={headers.length + 1}>{children}</Cell></S.Row>
  );

  return (<S.Row>{children}</S.Row>);
},
Cell = ({colspan, padding, children}) => {
  return (
    <S.Cell padding={padding} colSpan={colspan || 1}>{children}</S.Cell>
  );
},
Table = ({table}) => {
  return (
    <tableContext.Provider value={table}>
        <S.Table>
          <Header header={table.headers}/>
          <Body body={table.body}/>
        </S.Table>
    </tableContext.Provider>
  );
};
