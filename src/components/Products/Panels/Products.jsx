import React, {useEffect, useState} from "react";
import {SliderCard} from "components/Slider";
import Products from "../Products";
import {PANEL_STORE} from "lib/stores";

const
PRODUCTS_PANEL = ({selected}) => {
  const {component, data, setPanel} = PANEL_STORE.usePanelContext();
  if (!selected) return (<SliderCard level={0}>products</SliderCard>);

  if (!component && selected) setTimeout(() => setPanel("mountComponent", <Products/>));
  return (
    <React.Fragment>
      <SliderCard level={1}>products</SliderCard>
      <Excel/>
      <Sort/>
    </React.Fragment>
  );
},
Excel = () => {
  return (
    <SliderCard onClick={e => e.stopPropagation()} level={2}>excel</SliderCard>
  );
},
Sort = () => {
  const [selected, setSelected] = useState(false);

  if (!selected) return (<SliderCard level={2} onClick={handleSelection}>sort</SliderCard>);

  function handleSelection(e) {
    e.stopPropagation();
    setSelected(!selected);
  }

  return (
    <React.Fragment>
      <SliderCard onClick={handleSelection} level={2}>sort</SliderCard>
      <SliderCard onClick={e => e.stopPropagation()}level={3}>sort by time</SliderCard>
    </React.Fragment>
  );
};

export {PRODUCTS_PANEL};
