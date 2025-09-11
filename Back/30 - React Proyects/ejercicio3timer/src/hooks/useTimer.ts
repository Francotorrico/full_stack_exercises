import { useEffect, useState  } from "react";


type TimerReturn = {
    seconds: number;
    isRunning: boolean;
    toggle: () => void;
    reset: () => void;
};

export function useTimer(initialSeconds: number, onFinish: () => void): TimerReturn {
    const [seconds , setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);


    // hacemos toggle cambie de booleano
    const toggle = () => {
        setIsRunning(prev => !prev);
    };
    const reset = () => {
        setSeconds(initialSeconds);
        setIsRunning(false);
    };

    // creamos las reacciones 
    useEffect(() => {
        if (!isRunning) return;
        if (seconds <= 0) {
            onFinish();
            setIsRunning(false);
            return;
        }

        const timer = setTimeout(() => {
            setSeconds(seconds - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [seconds, isRunning, onFinish]);
    
    return {seconds , isRunning, toggle, reset};
}

