import styled from "styled-components";

const
Layout = styled.article`
flex: 1;
min-height: 100vh;
display: grid;
grid-template-columns: minmax(auto, 350px) 1fr;
grid-template-rows: auto 1fr auto;

header {
grid-column: 1/3;
grid-row: 1/2;

}

aside {
grid-column: 1/2;
grid-row: 2/3;

}

main {
grid-column: 2/3;
grid-row: 2/3;
}

footer {
grid-column: 1/3;
grid-row: 3/4;
}
`;

export default Layout;
