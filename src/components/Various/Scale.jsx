import {useState, useEffect, useRef} from "react";
import styled from "styled-components";
let sam = 0;
const
Wrapper = styled.div`
display: flex;
flex: ${props => props.done ? 1 : 0};
transform-origin: left top;
font-size: var(--font-root-regular);
transform: scaleX(${(props) => props.scale})
`,
Scale = ({panel, children}) => {
  const
  [scale, setScale] = useState(1),
  [done, setDone] = useState(false);

  useEffect(() => {
    const clientScroll = document.documentElement.scrollWidth,
          clientWidth = document.documentElement.clientWidth;

    if (clientScroll === clientWidth) {
      setDone(true);
      return null;
    }
    setScale(scale - 0.1, 1);
  }, [scale]);

  useEffect(() => {
    const clientScroll = document.documentElement.scrollWidth,
          clientWidth = document.documentElement.clientWidth;
    if (clientScroll === clientWidth) return null;
    setScale(scale - 0.1);
  }, [panel.data]);

  return (
    <Wrapper key={scale} scale={scale} done={done}>
      {children}
    </Wrapper>
  );
};

export {Scale};
