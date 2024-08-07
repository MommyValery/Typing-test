import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { accuracyCounting, speedCounting } from "../helpers/statsCounting";
import { decreaseSeconds } from "../redux/store/timerSlice";
import styled from "styled-components";

const SP = styled.p`
font: 25px Arial, sans-serif;
&.stats-title {
weight: bold;
font-size: 30px;
}
`;

const Stats = ({children}) => {
  const dispatch = useDispatch();
  const mistakes = useSelector(state => state.textSlice.mistakes);
  const pressingCount = useSelector(state => state.textSlice.pressingCount);
  const seconds = useSelector(state => state.timerSlice.seconds);
  const isTimerOn = useSelector(state => state.timerSlice.isTimerOn);
  const timeChoice = useSelector(state => state.timerSlice.timeChoice);
  const [speed, setSpeed] = useState('0.0');
  const [accuracy, setAccuracy] = useState('0.0');

// подсчет скорости и точности
  useEffect(()=>{
    console.log(timeChoice);
    const correctChars = pressingCount - mistakes;
    setAccuracy(accuracyCounting(mistakes, pressingCount));
    setSpeed(speedCounting(correctChars, timeChoice));
  }, [mistakes, pressingCount, timeChoice])

//уменьшение количества секунд
  useEffect (() => {
    if (isTimerOn) {
        const timer = setTimeout(() => {
          if (seconds > 0) {
            dispatch(decreaseSeconds());
          }
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [isTimerOn, dispatch])

  return (
    <div>
        <div>
            <SP className="stats-title">speed</SP>
            <SP>{speed} WPM</SP>
            <div>
                <SP className="stats-title">accuracy</SP>
                <SP>{accuracy} %</SP>
            </div>
            <div>
                <SP className="stats-title">mistakes</SP>
                <SP>{mistakes}</SP>
            </div>
            {children}
        </div>
    </div>
  )
}

export default Stats;