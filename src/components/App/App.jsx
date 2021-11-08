import {useResizeEvent} from "lib/hooks";
import Panel from "./Panel";
import {APP_STORE} from "lib/stores";
import {ListFlashMessages} from "components/Flash-messages";

export
const
App = () => {
  const
  {app, setApp} = APP_STORE.useApp(),
  resize = useResizeEvent();

  console.log(process.env);
  return (
    <APP_STORE.appContext.Provider value={{...app, setApp}}>
      <Panel key={resize}/>
      <ListFlashMessages/>
    </APP_STORE.appContext.Provider>
  );
};
