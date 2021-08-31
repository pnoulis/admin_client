import {useState, useEffect} from "react";
import styled from "styled-components";
let sam = 0;
const
Wrapper = styled.div`
flex: 1;
transform-origin: left top;
width: min-content;
font-size: var(--font-root-regular);
transform: scale(${(props) => props.scale})
`,
Scale = ({panel, children}) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (sam > 3) return;
    const clientScroll = document.documentElement.scrollWidth,
          clientWidth = document.documentElement.clientWidth;
    if (clientScroll === clientWidth) return null;

    console.log("content will scale");
    console.log(clientScroll);
    console.log(clientWidth);

    setScale(scale - 0.1);
    ++sam;
  }, [scale]);

  useEffect(() => {
    const clientScroll = document.documentElement.scrollWidth,
          clientWidth = document.documentElement.clientWidth;
    if (clientScroll === clientWidth) return null;
    setScale(scale - 0.1);
    ++sam;
  }, [panel.data]);

  return (
    <Wrapper scale={scale}>
      {children}
    </Wrapper>
  );
};

export {Scale};
