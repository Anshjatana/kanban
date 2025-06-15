import styled from "styled-components";

const FooterWrapper = styled.footer`
  text-align: center;
  padding: 20px 0;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  color: ${(props) => props.theme.colors.text.primary};

  p {
    margin: 0;
    font-size: 14px;

    a {
      color: ${(props) => props.theme.colors.text.primary};
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        &copy; {new Date().getFullYear()} Kanban Space. All rights reserved.
      </p>
      <p>
        Made in India with ❤️ by{" "}
        <a target="_blank" href="https://anshjatana.online">
          Ansh Jatana
        </a>
      </p>
    </FooterWrapper>
  );
};

export default Footer;
