import React, {useEffect, createRef} from "react";
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
S.Cell = styled.td`
font-size: var(--font-size-regular);
letter-spacing: 0.5px;
padding: 10px 5px;
border: 2px solid white;
text-align: center;

&:hover {
background-color: white;
}

${S.Header} & {
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
      <Cell colspan={length}>
        {errors.map((err, i) => (
          <S.Error key={i}>{err}</S.Error>
        ))}
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
      {body.map((row, i) => <FormRow key={i} data={row}/>)}
    </tbody>
  );
},
Row = ({children}) => {
  return (
    <S.Row>
      {children}
    </S.Row>
  );
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
