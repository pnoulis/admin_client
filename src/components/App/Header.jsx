import React from "react";
import styled from "styled-components";

const
HeaderWrapper = styled.div`
display: flex;
flex-flow: row nowrap;
padding: 10px;
background-color: var(--color-grey-phosSilver);
gap: 20px;
font-size: var(--font-root-regular);
align-items: center;
`,
Item = styled.div`
margin: ${props => props.margin || 0};
flex: ${props => props.flex || 0};
`,
LogoutWrapper = styled.div`
display: flex;
flex-flow: row nowrap;
align-items: center;
font-size: var(--font-size-large);
font-weight: bold;

span:hover {
cursor: pointer;
color: var(--color-primary);
}

img {
display: inline-block;
box-sizing: content-box;
width: 35px;
height: 35px;
margin-left: 15px;
}
`,
NotificationsWrapper = styled.div`
box-sizing: content-box;
width: 35px;
height: 35px;
padding: 5px 10px;
cursor: pointer;

img {
display: inline-block;
width: 100%;
height: 100%;
}
`,
Header = () => {
  return (
    <HeaderWrapper>
      <Item><Notifications/></Item>
      <Item margin={"0 0 0 auto"}><Logout/></Item>
    </HeaderWrapper>
  );
},
Logout = () => {
  return (
    <LogoutWrapper>
      <span>logout</span>
      <img src="/user_success.png" alt="user-logged-icon"/>
    </LogoutWrapper>
  );
},

Notifications = () => {
  return (
    <NotificationsWrapper>
      <img src="/bell_blue.png" alt="notification-bell"/>
    </NotificationsWrapper>
  );
};

export default Header;
