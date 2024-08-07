import styled from 'styled-components';
import logo from '../../logo.svg';

const SHeader = styled.div`
padding: 20px;
justify-content: center;
`;

const Header = () => {
  return (
    <header>
      <SHeader>
        <img src={logo} alt="logo" width="50" height="50"/>
        <h1>Typing Test</h1>
      </SHeader>
    </header>
  )
};

export default Header;