import { CgArrowDown, CgArrowUp  } from "react-icons/cg";

interface TimerSetterProps {
    time: number;
    setTime: (time: number) => void;
    min: number;
    max: number;
    type: "break" | "session";
}

const TimeSetter= ({
    time,
    setTime,
    min,
    max,
    type,
}:TimerSetterProps)=> {
    return (
       <div>
        <button onClick ={() => (time > min ? setTime(time-1) : null)}
        id={`${type}-decrement`} >
        <CgArrowDown />   
        </button>
        <span id={`${type}-length`}>{ time }</span>
        <button onClick={() => (time < max ? setTime(time + 1): null)}
        id={`${type}-increment`} >
        <CgArrowUp />
        </button>
       </div> 
    );
};
    export default TimeSetter;