import { useDispatch, useSelector } from "react-redux";
import Stats from "./stats";
import Text from "./text";
import { resetSeconds } from "../redux/store/timerSlice";
import { resetTextState, setText } from "../redux/store/textSlice";
import { restoreText } from "../helpers/charTransform";
import { resetTestState } from "../redux/store/testSlice";
import ModalWindow from "./modal-window";
import StyledButton from "./ui/button";



const Test = () => {
  const dispatch = useDispatch();
  const isTestFinished = useSelector(state => state.testSlice.isTestFinished);
  const text = useSelector(state => state.testSlice.text) || [];

  //сброс процесса
  function restart() {
    dispatch(resetSeconds());
    dispatch(resetTextState());
    dispatch(setText(restoreText(text)));
    dispatch(resetTestState());
    return <Text />

  }

  return (
    <section style={{ width: '100%', background: 'gray', justifyContent: 'center' }}>
      {
        isTestFinished ?
          <ModalWindow title='Test finished!'>
            <Stats />
            <StyledButton btnText='restart' onClick={restart} />
          </ModalWindow> :
          <Text />
      }
    </section>
  )
}



export default Test;