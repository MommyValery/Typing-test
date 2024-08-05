import React from 'react';
import Header from './components/ui/header';
import Footer from './components/ui/footer';
import {useDispatch, useSelector} from 'react-redux';
import { setIsTestStarted } from './redux/store/testSlice';
import Test from './components/test';
import ModalWindow from './components/modal-window';
import Button from './components/ui/button';

function App() {
  const dispatch = useDispatch();
  const isTestStarted = useSelector(state => state.testSlice.isTestStarted);
  const setTestState = () => dispatch(setIsTestStarted(true));

  return (
    <div style={{overflow: 'hidden',
      width: '100%', background: '#323437', font: '16px / 20px "Roboto Mono", "Roboto Mono", Vazirmatn, monospace', minHeight: '710px',
       }}>
    <Header />
    <main>
{
  isTestStarted ?
  <Test /> :
  <ModalWindow title='Take a typing test' >
    <Button btnText='start' onClick={setTestState} />
  </ModalWindow>
 
}
    </main>
    <Footer />
    </div>
  );
}

export default App;
