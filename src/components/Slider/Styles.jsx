import styled from "styled-components";

const
S = {},
LEVEL_COLORS = [
  "rgb(160, 169, 200)",
  "rgb(61, 108, 185)", // blue
  "rgb(255, 165, 0)", // orange
  "rgb(255, 36, 66)", // red
  "rgb(255, 228, 89)", // yellow
  "rgb(93, 130, 51)", // green
  "rgb(174, 0, 251)", // purple
  "rgb(255, 103, 231)" // pink
];

S.Aside = styled.div`
flex: 1;
height: ${({height}) => height ? height + "px" : "auto"};
overflow-y: scroll;
scroll-behavior: smooth;
scrollbar-color:  var(--color-primary) var(--color-grey-phosSilver);
font-size: var(--font-root-regular);
`;

S.Nav = styled.nav`
min-height: ${({minHeight}) => minHeight && minHeight + "px"};
height: max-content;
padding: 15px 5px 0 5px;
display: flex;
flex-flow: column nowrap;
`;

S.SliderCard = styled.div`
background-color: ${({level}) => LEVEL_COLORS[level]};
min-height: 50px;
max-height: 90px;
height: ${({level}) => 90 - level * 10 + "px"};
display: flex;
justify-content: center;
margin-bottom: 15px;
align-items: center;
border-radius: 8px;
cursor: pointer;

color: ${({level}) => !level ? "black" : "white"};
font-size: var(--font-size-large);
font-weight: bold;
letter-spacing: 0.5px;
text-transform: lowercase;

&:hover {
opacity: 0.7;
}
`;

export default S;
