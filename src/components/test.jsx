import { useDispatch, useSelector } from "react-redux";
import Stats from "./stats";
import Text from "./text";
import { resetSeconds } from "../redux/store/timerSlice";
import { resetTextState, setText } from "../redux/store/textSlice";
import { restoreText } from "../helpers/charTransform";
import { resetTestState, setIsTestFinished } from "../redux/store/testSlice";
import Button from "./ui/button";
import ModalWindow from "./modal-window";
import styled from "styled-components";
import { useState } from "react";



const Test = () => {
    const dispatch = useDispatch();
    const isTestFinished = useSelector(state => state.testSlice.isTestFinished);
    const text = useSelector(state => state.testSlice.text) || [];
    const [selectedTime, setSelectedTime] = useState(null);

    const handleTimeChange = (time) => {
        setSelectedTime(parseInt(time));
    };
    const handleComplete = () => {
        isTestFinished = true;
        setSelectedTime = null;
    }
    //сброс процесса -не работает 
    function restart () {
        dispatch(resetSeconds());
        dispatch(resetTextState());
        dispatch(setText(restoreText(text)));
        
        if (isTestFinished) {
            dispatch(setIsTestFinished(false));
        }
    }

    function newTest () {
        dispatch(resetTextState());
        dispatch(resetTestState());
        dispatch(resetSeconds());
    }

    return (
        <section style={{width: '100%', background: 'gray', justifyContent: 'center'}}>
            {
                isTestFinished ?
                <ModalWindow title='Test finished!'>
                    <Stats />
                    <Button btnText='restart' onClick={restart} />
                    <Button btnText='new test' onClick={newTest} />
                </ModalWindow> :
                <Text onComplete={handleComplete}/>
            }
        </section>
    )
}



export default Test;