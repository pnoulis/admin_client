import {Slider, SliderCard, Hide} from "components/Slider";
import * as Layout from "./Layout";
import {PRODUCTS_PANEL} from "components/Products";

export default function Sidebar() {
  return (
      <Hide>
        <Slider type="vertical">
          <SliderCard level={0}>hello</SliderCard>
          <SliderCard level={0}>hello</SliderCard>
          <PRODUCTS_PANEL/>
        </Slider>
      </Hide>
  );
}
