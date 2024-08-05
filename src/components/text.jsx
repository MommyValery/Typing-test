import { useDispatch, useSelector } from "react-redux"
import { fetchText, increasePressingCount, setCurrentCharIndex, setMistakes, setText } from "../redux/store/textSlice";
import { useEffect } from "react";
import { compareChars, getCurrentChar } from "../helpers/charTransform";
import { styled } from "styled-components";

const Text= () => {
    const dispatch = useDispatch();
    const text = useSelector(state => state.textSlice.text);
    const isLoading = useSelector(state => state.textSlice.isLoading);
    const error = useSelector(state => state.textSlice.error);
    const currentCharIndex = useSelector(state => state.textSlice.currentCharIndex);
    const mistakes = useSelector(state => state.textSlice.mistakes);
    const pressingCount = useSelector(state => state.textSlice.pressingCount);
    const sentences = useSelector(state => state.testSlice.sentences);

    useEffect(()=> {
        dispatch(fetchText(sentences))
    }, [dispatch])
    

    useEffect(()=> {
        const newText = getCurrentChar(text, currentCharIndex);
        dispatch(setText(newText));
    }, [dispatch, currentCharIndex])

    useEffect(() => {
        if (currentCharIndex < text.length) {
            const keyPressHandler = (evt) => {
                const [newText, newCurrentIndex, newMistakes] = compareChars(text, currentCharIndex, evt.key, mistakes);
                dispatch(setCurrentCharIndex(newCurrentIndex)); //работает только на правильный ввод
                dispatch(setText(newText)); //пока не введешь нужную букву, прогресс не идет
                dispatch(setMistakes(newMistakes)); //работает хорошо
                dispatch(increasePressingCount()); //не уверена, что норм работает
            }
            document.addEventListener('keypress', keyPressHandler);

            return ()=> {
                document.removeEventListener('keypress', keyPressHandler);
            }
        }
    }, [dispatch, text]);

    return (
        <div>
            {
                error && 
                <p>{error}</p>
            }
            {isLoading ?
            <p>Text is loading... </p> :
            <div>
                {text.map((item, index) => {
                    return (
                        <Char className={item.class} key={index}>{item.char}</Char>
                        // <span className={item.class} key={index}>
                        //     {item.char}
                        // </span>
                    )
                })}
            </div>
            }
        </div>
    )

}

export default Text;

const Char  = styled.span`font-color: ${props => props.class === 'right-char' ? 'green' : 'red' }`
