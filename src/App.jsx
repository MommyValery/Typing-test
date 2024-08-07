import React from 'react';
import Header from './components/ui/header';
import Footer from './components/ui/footer';
import { useDispatch, useSelector } from 'react-redux';
import { setIsTestStarted, setSentences } from './redux/store/testSlice';
import Test from './components/test';
import ModalWindow from './components/modal-window';
import { setSeconds } from './redux/store/timerSlice';
import { secondsOptions, sentencesOptions } from './const';
import styled, { createGlobalStyle } from 'styled-components';
import StyledButton from './components/ui/button';
import StyledSelect from './components/ui/select';

const GlobalStyle = createGlobalStyle`
body {
 background-color: #646669;
 color: #0d0c08;
 font-family: 'Arial', sans-serif;
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}`;

const MainContainer = styled.main`
 padding-top: 50px;
 margin: 0 auto;
 width: 90%;
 display: block;
 justify-content: center;
 height: calc(100vh - 100px);
`;


function App() {
  const dispatch = useDispatch();
  const isTestStarted = useSelector(state => state.testSlice.isTestStarted);
  const setTestState = () => dispatch(setIsTestStarted(true));
  const sentences = useSelector(state => state.testSlice.sentences);
  const seconds = useSelector(state => state.timerSlice.seconds);

  const changeSentences = (value) => dispatch(setSentences(value));
  const changeSeconds = (value) => dispatch(setSeconds(value));


  return (
    <>
      <GlobalStyle />
      <Header />
      <MainContainer>
        {
          isTestStarted
            ? <Test />
            : <ModalWindow title='Take a typing test'>
              <label style={{ fontWeight: 'bolder' }} htmlFor='select-senteces'>
                Choose count of sentences:
              </label>
              <StyledSelect
                id='select-senteces'
                defaultValue={sentences}
                options={sentencesOptions}
                onChange={(event) => changeSentences(event.target.value)}
              />
              <label style={{ fontWeight: 'bolder' }} htmlFor='select-senteces'>
                Choose count of seconds:
              </label>
              <StyledSelect
                id='select-seconds'
                defaultValue={seconds}
                options={secondsOptions}
                onChange={(event) => changeSeconds(event.target.value)}
              />
              <StyledButton btnText='start' onClick={setTestState} />
            </ModalWindow>
        }
      </MainContainer>
      <Footer />
    </>
  );
};

export default App;
