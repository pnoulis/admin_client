import {APP_STORE} from "lib/stores";
import {FLASHES} from "./Flashes";
const {useAppContext} = APP_STORE;

export function ListFlashMessages() {
  const {flashMessages} = useAppContext();

  return (
    <div>
      {flashMessages.map((fm, i) => (
        FLASHES[fm.flashId](i, fm)
      ))}
    </div>
  );
}
