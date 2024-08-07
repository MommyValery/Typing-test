import styled from "styled-components";


const Button = ({ btnText, ...props }) => {
  return (
    <button {...props}>{btnText}</button>
  )
};

const StyledButton = styled(Button)`
  display: inline-block;
  margin-left: 10px;
  padding: .75rem 1.25rem;
  border-radius: 10rem;
  color: #fff;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: .15rem;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: 15%;
  background-color: gray;
`;

export default StyledButton;