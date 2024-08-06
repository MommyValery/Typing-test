import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { accuracyCounting, speedCounting } from "../helpers/statsCounting";
import { decreaseSeconds } from "../redux/store/timerSlice";

const Stats = ({children}) => {
  const dispatch = useDispatch();
  const mistakes = useSelector(state => state.textSlice.mistakes);
  const pressingCount = useSelector(state => state.textSlice.pressingCount);
  const seconds = useSelector(state => state.timerSlice.seconds);
  const isTimerOn = useSelector(state => state.timerSlice.isTimerOn);
  const [speed, setSpeed] = useState('0.0');
  const [accuracy, setAccuracy] = useState('0.0');

// подсчет скорости и точности
  useEffect(()=>{
    console.log(pressingCount);
    const correctChars = pressingCount - mistakes;
    setAccuracy(accuracyCounting(mistakes, pressingCount));
    setSpeed(speedCounting(correctChars, seconds));
  }, [mistakes, pressingCount, seconds])

//уменьшение количества секунд
  useEffect (() => {
    if (isTimerOn) {
        const timer = setTimeout(() => {
            dispatch(decreaseSeconds());
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [isTimerOn, dispatch])

  return (
    <div>
        <div>
            <p>speed</p>
            <p>{speed} WPM</p>
            <div>
                <p>accuracy</p>
                <p>{accuracy} %</p>
            </div>
            {children}
        </div>
    </div>
  )
}

export default Stats;