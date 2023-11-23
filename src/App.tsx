import { useState, useEffect } from 'react';
import './App.css';
import { DisplayState } from './Types';
import TimeSetter from './TimeSetter';
import Display from './Display';
import AlarmSound from './assets/AlarmSound.mp3'

const defaultBreakTime= 5;
const defaultSessionTime = 25;
const defaultTimer = 1500;
const min = 1;
const max = 60;


function App() {
  const [breakLength, setBreakLength] = useState<number>(defaultBreakTime);
  const [sessionLength, setSessionLength] = useState<number>(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>( {
    timeLeft: defaultTimer,
    timeType: "Session",
    play: false
  });


  const changeBreakTime = (time: number) => {
    if (displayState.play) return;
    setBreakLength(time);
  };

  const changeSessionTime = (time: number) => {
    if (displayState.play) return;
    setSessionLength(time);
    setDisplayState({
      timeLeft: time*60,
      timeType: "Session",
      play: false,
    })
  };
  const decreseTime = () => {
    setDisplayState(d => ({
      ...d,
      timeLeft: d.timeLeft - 1,
    }));
  };
  
  const startStop = () => {
    setDisplayState(d => ({
      ...d,
      play: !d.play,
    }));
  };

  const reset = () => {
    setBreakLength(defaultBreakTime);
    setSessionLength(defaultSessionTime);
    setDisplayState({
      timeLeft: defaultSessionTime*60,
      timeType: "Session",
      play: false,
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };
  useEffect(() => {
    const audio = document.getElementById("beep") as HTMLAudioElement;
    if(displayState.timeLeft === -1 && displayState.timeType === "Session"){
      setDisplayState(d => ({
        ...d,
        timeLeft: breakLength*60,
        timeType: "Break",
      }));
      audio.play();
    }
    else if(displayState.timeLeft === -1 && displayState.timeType === "Break"){
      setDisplayState(d => ({
        ...d,
        timeLeft: sessionLength*60,
        timeType: "Session",
      }));
      audio.pause();
      audio.currentTime = 0;
    }
  }, [displayState, breakLength, sessionLength]);

  useEffect(() => {
    let timerID: number;
    if (!displayState.play) return;

    if (displayState.play) {
      timerID = window.setInterval(decreseTime, 1000);
    }

    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.play]);

  return (
    <div>
    <div className='container'>
      <h1>25 + 5 Clocks</h1>
      <div className='setting'>
        <div className='break'>
          <h4 id='break-label'> Break Length</h4>
          <TimeSetter 
          time={breakLength}
          setTime={changeBreakTime}
          min={min}
          max={max}
          type="break"
          />
        </div>
        <div className='session'>
          <h4 id='session-label'> Session Length</h4>
          <TimeSetter
          time={sessionLength}
          setTime={changeSessionTime}
          min={min}
          max={max}
          type="session"
           />
        </div>
      </div>
      <Display
      displayState={displayState}
      reset={reset}
      startStop={startStop} />
    </div>
    <audio 
    id = 'beep' 
    preload='auto'
    src={AlarmSound} />
    </div>
  )
}

export default App
