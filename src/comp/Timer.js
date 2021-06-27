import { useEffect, useState } from "react";


export default function Timer({ setisFinis, questionNumber }) {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (timer === 0) return setisFinis(true)  ;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, setisFinis]);



    useEffect(() => {
        setTimer(30);

    }, [questionNumber]);

    return timer;
}
