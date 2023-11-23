import { DisplayState } from "./Types.ts";
import {SlControlPause, SlControlPlay} from "react-icons/sl";
import { LiaUndoAltSolid } from "react-icons/lia";

interface DisplayProps {
    displayState: DisplayState;
    reset: ()=> void;
    startStop: (play: boolean) => void;
   
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
};

const Display = ({
    displayState,
    reset,
    startStop,
}:DisplayProps) => {
    return (
       <div className="timer-wrapper">
        <div className='timer-display'>
        <h4 id="timer-label">{displayState.timeType}</h4>
        <span id="time-left" style={{ color: `${displayState.timeLeft <= 60 ? "red" : "white"}` }}>
            {formatTime(displayState.timeLeft)}
        </span>
        </div>
        <div >
            <button id="start_stop" onClick={() => startStop(displayState.play)}>
                {displayState.play ? <SlControlPause /> : <SlControlPlay />}
            </button>
            <button id="reset" onClick={reset}>
                <LiaUndoAltSolid />
            </button>
        </div>
       </div> 
    )
}

export default Display;