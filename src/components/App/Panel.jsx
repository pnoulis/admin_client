import * as Layout from "./Layout";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import {PANEL_STORE} from "lib/stores";
import {Scale} from "components/Various";
import styled from "styled-components";

const
Panel = () => {
  const {panel, setPanel} = PANEL_STORE.usePanel({});

  return (
    <PANEL_STORE.panelContext.Provider value={{...panel, setPanel}}>
        <Layout.Root>
          <Header></Header>
          <Layout.Main>
            <Layout.Sidebar>
              <Sidebar/>
            </Layout.Sidebar>
            <Scale panel={panel}>
              {panel.component || null}
            </Scale>
          </Layout.Main>
          <Footer/>
        </Layout.Root>
    </PANEL_STORE.panelContext.Provider>
  );
};

export default Panel;
