import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sound/play.mp3";
import correct from "../sound/correct.mp3";
import wrong from "../sound/wrong.mp3";
import wait from "../sound/wait.mp3";


export default function Trivia({ data, questionNumber, setQuestionNumber, setisFinis }) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);
    const [waitAnswer,{stop}] = useSound(wait);

    useEffect(() => {
        

            letsPlay();
            waitAnswer()
        
    }, [letsPlay,waitAnswer]);

   


    useEffect(() => {
        waitAnswer()
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);



    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };



    const handleClick = (text) => {
        stop()
        setSelectedAnswer(text);
        setClassName("answer active");

        delay(3000, () => {
            setClassName(text.correct ? "answer correct" : "answer wrong");
        });

        delay(5000, () => {
            if (text.correct) {
                correctAnswer();
                delay(1000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                });

            } else {
                wrongAnswer();
                delay(1000, () => {
                    setisFinis(true);
                });

            }

        })
    };

    
    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((text) => (
                    <div className={selectedAnswer === text ? className : "answer"} onClick={() => !selectedAnswer && handleClick(text)}>
                       {text.col + ")"} {text.text} 
                    </div>
                ))}
            </div>
        </div>
    );
}
