import * as Layout from "./Layout";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import {PANEL_STORE} from "lib/stores";
import {Scale} from "components/Various";

const
Panel = () => {
  const {panel, setPanel} = PANEL_STORE.usePanel({});

  return (
    <PANEL_STORE.panelContext.Provider value={{...panel, setPanel}}>
        <Layout.Root>
          <Layout.Header><Header/></Layout.Header>
          <Layout.Sidebar><Sidebar/></Layout.Sidebar>
          <Layout.Main>
            <Scale panel={panel}>
              {panel.component || null}
            </Scale>
          </Layout.Main>
          <Layout.Footer><Footer/></Layout.Footer>
        </Layout.Root>
    </PANEL_STORE.panelContext.Provider>
  );
};

export default Panel;
