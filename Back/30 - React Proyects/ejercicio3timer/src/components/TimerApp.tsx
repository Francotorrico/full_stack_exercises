import { useTimer} from '../hooks/useTimer';


export default function TimerApp() {
    const {seconds, isRunning, toggle, reset} = useTimer(10,()=> 
        alert("timer finished")
    );




    return (
        <div>
            <h1>Timer</h1>
            <p>seconds: {seconds}</p>
            <button onClick={toggle}>{isRunning ? "Stop" : "Start"}</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
