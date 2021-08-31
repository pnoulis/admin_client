import styled from "styled-components";

export
const
Root = styled.article`
flex: 1;
min-height: 100%;
min-width: 100%;
display: grid;
grid-template-columns: minmax(auto, 350px) 1fr;
grid-template-rows: auto 1fr auto;
`,
Header = styled.header`
grid-column: 1/3;
grid-row: 1/2;
`,
Sidebar = styled.aside`
grid-column: 1/2;
grid-row: 2/3;
display: flex;
`,
Main = styled.main`
grid-column: 2/3;
grid-row: 2/3;
display: flex;
`,
Footer = styled.footer`
grid-column: 1/3;
grid-row: 3/4;
`;

