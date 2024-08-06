import { useEffect, useState } from "react";
import styled from "styled-components"
import { setIsTestFinished } from "../../redux/store/testSlice";

const TimerContainer = styled.div`
padding-left: 20px;
display: flex;
flex-direction: column;
`;

const TimerDisplay = styled.h1`
font-size: 1.5rem;
color: #ffffff;
`;

const Timer = ({seconds}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

 useEffect(()=> {
    if (timeLeft === 0 ) {
        setIsTestFinished(true);
        return;
    }

    const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
 }, 1000)
 return () => clearInterval(timerId);

 }, [timeLeft]);

 return (
    <TimerContainer>
        <TimerDisplay>{timeLeft} секунд</TimerDisplay>
    </TimerContainer>
 )
}

export default Timer;