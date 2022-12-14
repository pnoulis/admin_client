import backend from "lib/backend";
import {useEffect, useState} from "react";
import {useBackend, renderStatus} from "lib/hooks";
import {PANEL_STORE} from "lib/stores";
import {Table} from "components/Tables";
import styled from "styled-components";
import {FlexibleField_0 as TextField, ImageField, SelectionField} from "components/Fields";

const
{usePanelContext} = PANEL_STORE,
tags = (async () => {
  const res = await backend.get({url: "/tags"});
  if (!res.ok) return alert("could not load tags");

  return res.payload.map(v => v.tag);
})(),
products = "/product",
pus = [
  "euro",
  "pound",
  "dollar"
],
mus = [
  "kg",
  "gr",
  "lt",
],
CELL_MAP = {
  img: (<ImageField/>),
  pid: (<TextField name="pid" disabled={true}/>),
  title: (<TextField name="title"/>),
  description: (<TextField name="description"/>),
  supplier: (<TextField name="supplier"/>),
  sid: (<TextField name="sid"/>),
  wpu: (<TextField name="wpu"/>),
  ppu: (<TextField name="ppu"/>),
  tp: (<TextField name="tp" disabled={true}/>),
  stock: (<TextField name="stock"/>),
  vstock: (<TextField name="vstock" disabled={true}/>),
  inStock: (<TextField name="inStock" disabled={true}/>),
  tags: (<SelectionField list={tags} multiple={true} name="tags" each="tag"/>),
  mu: (<SelectionField list={mus} multiple={false} name="mu"/>),
  pu: (<SelectionField list={pus} multiple={false} name="pu"/>),
},
PRODUCT_SCHEMA = {
  toggled: false,
  edit: false,
  new: true,
  fieldErrors: {},
  fields: {
    pid: "",
    title: "",
    mu: "",
    pu: "",
    img: "",
    tags: [],
    description: "",
    supplier: "",
    sid: "",
    wpu: "",
    ppu: "",
    tp: 0,
    stock: "",
    vstock: 0,
    inStock: false,
    oldImg: "",
  }
},
Wrapper = styled.article`
flex: 1;
display: flex;
justify-content: center;
padding: 150px 30px 150px 50px;
align-items: items;
font-size: var(--font-root-regular);
`,
Products = () => {
  const
  {data, key, setPanel} = usePanelContext(),
  {setReq, status, res} = useBackend();

  useEffect(() => {
    if (data) return;
    setReq({method: "get", url: "/products"});
  },[]);

  useEffect(() => {
    if (!res) return null;
    if (res.ok) {
      setTimeout(() => setPanel("setData", res.payload));
    }
  }, [res]);

  return (
    <Wrapper>
      {status && renderStatus(status)}
        {
          data &&
            <Table key={key} table={{
              body: data,
              headers: Object.keys(CELL_MAP),
              extras: [],
              target: products,
              cellMap: CELL_MAP,
              formSchema: PRODUCT_SCHEMA,
            }}
            />
        }
    </Wrapper>
  );
};

export default Products;
