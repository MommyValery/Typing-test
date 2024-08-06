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
                dispatch(setCurrentCharIndex(newCurrentIndex)); 
                dispatch(setText(newText)); 
                dispatch(setMistakes(newMistakes)); 
                dispatch(increasePressingCount()); //не уверена, что норм работает
                // console.log(compareChars(text, currentCharIndex, evt.key, mistakes));
            }
            document.addEventListener('keypress', keyPressHandler);
            window.addEventListener('keydown', (evt) => {  
                if (evt.keyCode === 32 && evt.target === document.body) {  
                  evt.preventDefault();  
                } 
            })
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
                        <span className={item.class} key={index}
                        style={{fontColor:(item.class === 'right-char'? 'green' : 'red')}}>
                          {item.char}</span>
                    )
                })}
            </div>
            }
        </div>
    )

}

export default Text;

const Char  = styled.span`font-color: ${props => props.class === 'right-char' ? 'green' : 'red' }`
