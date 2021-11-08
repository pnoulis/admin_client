import React, {useState, useEffect, useRef} from "react";
import S from "./Styles";

const SliderCard = S.SliderCard;
export {Slider, SliderCard};

function Slider({type, children}) {
  const
  container = useRef(null),
  slider = useRef(null),
  [selected, setSelected] = useState({}),
  [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (typeof selected.id !== "number") container.current.scrollTop = 0;
  }, [selected]);

  useEffect(() => {
    if (Object.keys(dimensions).length) return;
    setDimensions(calculateDimensions(type, children.length, container, slider));
  }, [dimensions]);

  return (
      <S.Aside ref={container} height={dimensions.container}>
        <S.Nav ref={slider} minHeight={dimensions.slider}>
          {
            children.map((c, i) => (
              i === selected.id ? null :
                <SliderNode key={i} id={i} setSelected={setSelected}>
                  {c}
                </SliderNode>
            ))
          }
          {
            typeof selected.id === "number" &&
              <SliderNode key={selected.id} id={selected.id} setSelected={setSelected} selected>
                {children[selected.id]}
              </SliderNode>
          }
        </S.Nav>
      </S.Aside>
  );
}

function SliderNode({id, setSelected, selected, children}) {
  const node = useRef(null);

  useEffect(() => {
    selected && node.current.scrollIntoView();
  }, [selected]);

  return (
    <div ref={node}
         onClick={() => selected ? setSelected({}) : setSelected({id})}
    >{selected ? React.cloneElement(children, {selected}) : children}
    </div>
  );
}
function calculateDimensions(type, sliderChildren, container, slider) {
  let containerXY = 0, sliderXY = 0, browserXY = 0, diff = 0;

  containerXY = type === "vertical" ? container.current.offsetHeight :
    container.current.offsetWidth;

  sliderXY = type === "vertical" ? slider.current.offsetHeight :
    container.current.offsetWidth;

  browserXY = type === "vertical" ? document.documentElement.clientHeight :
    document.documentElement.clientWidth;

  diff = containerXY - sliderXY;
  if (!diff) diff = sliderXY - browserXY;
  // diff ||= sliderXY - browserXY;

  return {
    container: browserXY - (browserXY - containerXY),
    slider: containerXY * 2 - diff - Math.round(sliderXY / sliderChildren),
    calculated: true,
  };
}
function useSlider(type, sliderChildren, container, slider) {
  const [dimensions, setDimensions] = useState({});

  if (!container.current || !slider.current || dimensions.calculated) return dimensions;
  let containerXY = 0, sliderXY = 0, browserXY = 0, diff = 0;

  containerXY = type === "vertical" ? container.current.offsetHeight :
    container.current.offsetWidth;

  sliderXY = type === "vertical" ? slider.current.offsetHeight :
    container.current.offsetWidth;

  browserXY = type === "vertical" ? document.documentElement.clientHeight :
    document.documentElement.clientWidth;

  diff = containerXY - sliderXY;
  if (!diff) diff = sliderXY - browserXY;
  // diff ||= sliderXY - browserXY;

  setDimensions({
    container: browserXY - (browserXY - containerXY),
    slider: containerXY * 2 - diff - Math.round(sliderXY / sliderChildren),
    calculated: true,
  });

  return dimensions;
}
