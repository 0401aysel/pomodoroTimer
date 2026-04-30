import { usePomodoro } from "./hooks/usePomodoro";
import Clock from "./Clock";
import Timer from "./Timer";

function App() {
  const { mode, timeLeft, isRunning, round, start, pause, reset, skip } =
    usePomodoro({ focusTime: 10, shortBreakTime: 5, longBreakTime: 7 });

  return (
    <div className="container">
      <div className="timer">
        <div className="buttons">
          <button className="controls" onClick={start}>
            Start
          </button>
          <button className="pause" onClick={pause}>
            {isRunning ? "Pause" : "Resume"}
          </button>
          <button onClick={reset}>Reset</button>
          <button onClick={skip}>Skip</button>
        </div>
        <div className="info">
          <p>Mode: {mode}</p>
          <p>Round: {round}</p>
        </div>
        <div className="clock">
          <Clock />
          <Timer timeLeft={timeLeft} />
        </div>
      </div>
    </div>
  );
}

export default App;
