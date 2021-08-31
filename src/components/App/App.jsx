import {useResizeEvent} from "lib/hooks";
import Panel from "./Panel";
import {APP_STORE} from "lib/stores";

export
const
App = () => {
  const
  {app, setApp} = APP_STORE.useApp(),
  resize = useResizeEvent();

  return (
    <APP_STORE.appContext.Provider value={{...app, setApp}}>
      <Panel/>
    </APP_STORE.appContext.Provider>
  );
};
