import "./App.scss";
import { useEffect, useMemo, useState } from "react";
import Start from "./comp/Start";
import Timer from "./comp/Timer";
import DataList from "./comp/DataList";
import data from "./data"

function App() {
  const [username, setUsername] = useState(null);
  const [isFinis, setisFinis] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [money, setMoney] = useState("$ 0");



  const moneyList = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  const reload = () => {
    setisFinis(false)
    setQuestionNumber(1)
    setMoney("$ 0")
  }



  useEffect(() => {
    questionNumber > 1 &&
      setMoney(moneyList.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyList]);




  return (
    <div className="app">
      {!username ? <Start setUsername={setUsername} />
        : (
          <>
            <div className="main">
              {isFinis ? <> <h1 className="endText"> {username}: Qazandiginiz mebleg: {money}  </h1> <button className="btn-restart" onClick={() => reload()}>Yeniden oyna</button> </>
                :
                <>

                  <div className="top">
                    <div className="timer">
                      <Timer setisFinis={setisFinis} questionNumber={questionNumber} />
                    </div>
                  </div>



                  <div className="bottom">
                    <DataList data={data} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} setisFinis={setisFinis} />
                  </div>



                </>
              }
            </div>
            <div className="pyramid">
              <ul className="moneyList">
                {moneyList.map((m) => (
                  <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
                    <span className="moneyListItemNumber">{m.id}</span>
                    <span className="moneyListItemAmount">{m.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
    </div>
  );
}

export default App;