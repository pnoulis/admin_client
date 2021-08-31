import backend from "lib/backend";
import {useEffect, useState} from "react";
import {useBackend, renderStatus} from "lib/hooks";
import {PANEL_STORE} from "lib/stores";
import {Table} from "components/Tables";
import styled from "styled-components";
import {FlexibleField_0 as TextField, ImageField, SelectionField} from "components/Fields";

const
{usePanelContext} = PANEL_STORE,
tags = backend.get({url: "/tags"}),
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
  img: (<ImageField/>),
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
    img: {},
    tags: [],
    description: "",
    supplier: "",
    sid: "",
    wpu: 0,
    ppu: 0,
    tp: 0,
    stock: 0,
    vstock: 0,
    inStock: false,
    oldImg: "",
  }
},
Wrapper = styled.article`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: items;
font-size: var(--font-root-regular);
`,
Products = () => {
  const
  {data, setPanel} = usePanelContext(),
  {setReq, status, res} = useBackend();

  useEffect(() => {
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
            <Table table={{
              body: data,
              headers: Object.keys(CELL_MAP),
              extras: [],
              cellMap: CELL_MAP,
              formSchema: PRODUCT_SCHEMA,
            }}
            />
        }
    </Wrapper>
  );
};

export default Products;
