import {useRef, useState, useEffect} from "react";
import styled from "styled-components";

// width: ${props => {
//   if (props.toggled) return "0px";
//   return props.dimensions.width + "px";
// }};

const S = {};
S.Toggle = styled.div`
display: flex;
width: ${props => props.toggled ? "0px" : "350px"};
transition: transform 2s, width 2s;

z-index: 1000;
position: relative;
& * {
color: ${props => props.toggled ? "transparent" : "initial"};
transition: transform 1s, color 1s ease-in;
}
::before{
content: "";
background-image: url("right-arrow-angle.png");
background-size: cover;
background-repeat: no-repeat;

box-sizing: content-box;
padding: 10px 10px;
width: 30px;
height: 30px;
cursor: pointer;

position: absolute;
top: 50%;
right: ${props => props.toggled ? "-43px" : "-50px"};
transform: ${props => props.toggled ? "rotate() translate(0, 12%)" : "rotate(-180deg) translate(0, 0%)"};
transition: transform 2s, right 2s;
}
`;

export function Hide({children}) {
  const
  [toggle, setToggle] = useState(false),
  [dimensions, setDimensions] = useState({}),
  ref = useRef(null);

  function handleToggle(e) {
    if (e.target !== ref.current) return;
    setToggle(!toggle);
  }

  return (
    <S.Toggle ref={ref} dimensions={dimensions} toggled={toggle} onClick={handleToggle}>
      {children}
    </S.Toggle>
  );
}
