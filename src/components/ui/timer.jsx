import { useEffect } from "react";
import styled from "styled-components"
import { setIsTestFinished } from "../../redux/store/testSlice";
import { useDispatch, useSelector } from "react-redux";
import { decreaseSeconds } from "../../redux/store/timerSlice";

const TimerContainer = styled.div`
padding-left: 20px;
display: flex;
flex-direction: column;
`;

const TimerDisplay = styled.h1`
font-size: 1.5rem;
color: #ffffff;
`;

const Timer = () => {
  const dispatch = useDispatch();
  const seconds = useSelector(state => state.timerSlice.seconds);
  const isTimerOn = useSelector(state => state.timerSlice.isTimerOn);

  //отсчет времени в режиме реального времени
  useEffect(() => {
    let timerId;

    if (isTimerOn && seconds > 0) {
      timerId = setInterval(() => {
        if (seconds > 0) {
          dispatch(decreaseSeconds());
        }
      }, 1000);
    }
    if (seconds === 0) {
      dispatch(setIsTestFinished(true));
    }
    return () => clearInterval(timerId);
  }, [isTimerOn, seconds, dispatch]);


  return (
    <TimerContainer>
      <TimerDisplay>{seconds} секунд</TimerDisplay>
    </TimerContainer>
  )
}

export default Timer;