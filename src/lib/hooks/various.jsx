import {useEffect, useState} from "react";
import styled from "styled-components";

const
Wrapper = styled.div`
transform-origin: left top;
width: min-content;
font-size: var(--font-root-regular);
position: absolute;
transform: scale(${(props) => props.scale})
`;

export
const
useHover = () => {
  const [hovered, set] = useState(false);

  return {
    hovered,
    bindHover: {
      onMouseEnter: () => set(true),
      onMouseLeave: () => set(false),
    },
  };
},
useFocus = () => {
  const [focused, set] = useState(false);
  return {
    focused,
    bindFocus: {
      onFocus: () => set(true),
      onBlur: () => set(false),
    },
  };
},
useScale = (initConfig) => {
  const
  [scale, setScale] = useState(initConfig),
  [mounted, setMounted] = useState(false);

  useEffect(() => {
    // if (mounted) return;
    // const clientScroll = document.documentElement.scrollWidth,
    //       clientWidth = document.documentElement.clientWidth;

    // console.log(clientScroll);
    // console.log(clientWidth);
    // if (clientScroll > clientWidth) setScale(scale - 0.1);
    // if (clientScroll === clientWidth) setMounted(true);
  }, [scale]);

  return {
    Scale: ({children}) => {
      return (
        <Wrapper scale={scale}>
          {children}
        </Wrapper>
      );
    },
    incr: (incr) => setScale(scale + incr),
    decr: (decr) => setScale(scale - decr),
  };
},

useResizeEvent = () => {
  const [resize, setResize ] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setResize((Math.random() + 1).toString(36).substring(7));
    });
  }, []);

  return resize;
};
