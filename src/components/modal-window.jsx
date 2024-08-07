import styled from "styled-components";

const SModalWindow = styled.div`
display: flex;
flex-direction: column;
padding: 20px;
justify-content: space-between;
`;

const ModalWindow = ({ children, title }) => {
  return (
    <div>
      <SModalWindow>
        <h2>
          {title}
        </h2>
        {children}
      </SModalWindow>
    </div>
  )
};



export default ModalWindow;