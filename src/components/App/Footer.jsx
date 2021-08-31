import styled from "styled-components";

const
FooterWrapper = styled.div`
background-color: black;
display: flex;
justify-content: flex-end;
align-items: center;
padding: 0 10px;
`,
Item = styled.p`
color: var(--color-primary);
font-size: var(--font-root-small);
font-weight: bold;
`,
Footer = () => {
  return (
    <FooterWrapper>
      <Item>created by ostrix</Item>
    </FooterWrapper>
  );
};

export default Footer;
