import { useDispatch, useSelector } from "react-redux"
import { fetchText, increasePressingCount, setCurrentCharIndex, setMistakes, setText } from "../redux/store/textSlice";
import { useEffect } from "react";
import { compareChars, getCurrentChar } from "../helpers/charTransform";
import { styled } from "styled-components";
import { setTimerOn } from "../redux/store/timerSlice";
import { setIsTestFinished } from "../redux/store/testSlice";
import Timer from "./ui/timer";

const Text = () => {
  const dispatch = useDispatch();
  const text = useSelector(state => state.textSlice.text);
  const isLoading = useSelector(state => state.textSlice.isLoading);
  const error = useSelector(state => state.textSlice.error);
  const currentCharIndex = useSelector(state => state.textSlice.currentCharIndex);
  const mistakes = useSelector(state => state.textSlice.mistakes);
  const pressingCount = useSelector(state => state.textSlice.pressingCount);
  const sentences = useSelector(state => state.testSlice.sentences);
  const seconds = useSelector(state => state.timerSlice.seconds);
  const isTimerOn = useSelector(state => state.timerSlice.isTimerOn);

  // загрузка текста
  useEffect(() => {
    dispatch(fetchText(sentences))
  }, [dispatch])

  //получение введенного текста
  useEffect(() => {
    const newText = getCurrentChar(text, currentCharIndex);
    dispatch(setText(newText));
  }, [dispatch, currentCharIndex])


  //включение и выключение таймера
  useEffect(() => {
    if (pressingCount === 0 && text.length > 0) {
      dispatch(setTimerOn(true));
    }
    if (currentCharIndex < text.length) {
      const keyPressHandler = (evt) => {
        if (!isTimerOn && pressingCount === 0) {
          dispatch(setTimerOn(true));
        }
        const [newText, newCurrentIndex, newMistakes] = compareChars(text, currentCharIndex, evt.key, mistakes);
        dispatch(setCurrentCharIndex(newCurrentIndex));
        dispatch(setText(newText));
        dispatch(setMistakes(newMistakes));
        dispatch(increasePressingCount());

        if (newCurrentIndex === text.length) {
          dispatch(setTimerOn(false));
          dispatch(setIsTestFinished(true));
        }
      }
      document.addEventListener('keypress', keyPressHandler);
      return () => {
        document.removeEventListener('keypress', keyPressHandler);
      }
    }
  }, [dispatch, text, isTimerOn]);

  return (
    <div>
      <Timer />
      {
        error &&
        <p>{error}</p>
      }
      {isLoading ?
        <p>Text is loading... </p> :
        <div style={{ padding: 15, border: '1px solid black' }}>
          {text.map((item, index) => {
            return (
              <SSpan className={item.class} key={index}>
                {item.char}</SSpan>
            )
          })}
        </div>
      }
    </div>
  )

}

const SSpan = styled.span`
 font-size: 30px;
 line-height: 1.5;
 letter-spacing: 2px;
 text-align: justify;
 &.right-char {
 color: green;
 }
 &.wrong-char {
 color: red;
 }
 &.current-char {
 text-decoration: underline;
 }
`;


export default Text;
