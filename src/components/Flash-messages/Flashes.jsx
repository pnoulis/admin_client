// own - utilities
import {APP_STORE} from "lib/stores";
const {useAppContext} = APP_STORE;
// styles
// import style from "./styles/flashes.module.scss";
const style = {};


export const FLASHES = {
  FRegisterDuplicate: (index, flashMessage) => <AccountDuplicate key={index} {...flashMessage}/>,
  FRegisterFailure: (index, flashMessage) => <RegisterFailure key={index} {...flashMessage}/>,
  FLoginNoAccount: (index, flashMessage) => <NoAccount key={index} {...flashMessage}/>,
  FLoginPassword: (index, flashMessage) => <WrongPassword key={index} {...flashMessage}/>,
  FRegisterSuccess: (index, flashMessage) => <RegisterSuccess key={index} {...flashMessage}/>,
  FLoginSuccess: (index, flashMessage) => <LoginSuccess key={index} {...flashMessage}/>,
};

const
useTimeout = (flashId, timeAlive) => {
  const {setApp} = useAppContext();
  setTimeout(() => setApp("removeFlash", flashId), timeAlive);
},
AccountDuplicate = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article id={flashId} className={style.flashContainer}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        An account has already been registered with that email!
      </p>
    </article>
  );
},
NoAccount = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        No Account registered with that email!
      </p>
    </article>
  );
},

RegisterFailure = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        Failed to register
      </p>
    </article>
  );
},
WrongPassword = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user.png"
          alt="smalls-user-icon"
        />
      </div>
      <p className={style.message}>
        Passwords do not match!
      </p>
    </article>
  );
},
RegisterSuccess = ({flashId}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user_success.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        Yay!! &ensp; Successfull registration.
      </p>
    </article>
  );
},
LoginSuccess = ({flashId, username}) => {
  const config = {timeAlive: 7000}; // 7 seconds
  useTimeout(flashId, config.timeAlive);

  return (
    <article className={style.flashContainer} id={flashId}>
      <div className={style.imgContainer}>
        <img
          src="/beingUsed/user_success.png"
          alt="small-user-icon"
        />
      </div>
      <p className={style.message}>
        Welcome, &ensp; {username || "user"}&ensp;!
      </p>
    </article>
  );
};
