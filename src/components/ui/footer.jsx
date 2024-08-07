import styled from "styled-components";

const Footer = () => {
  return (
     <footer>
         <SFdiv>
         <p>Made by Valeria R. &copy; 2024</p>
         </SFdiv>
    </footer>
  )
};

const SFdiv = styled.div`
padding: 20px;
justify-content: center;
`;

export default Footer;