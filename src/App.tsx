import { useEffect, useState } from "react";
import Clock from "./Clock";
import Timer from "./Timer";

function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [step, setStep] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(30);

  const toggleStep = () => {
    setStep((prev) => {
      const next = prev === "work" ? "break" : "work";
      setTimeLeft(next === "work" ? 30 : 15);
      return next;
    });
  };

  useEffect(() => {
    if (!isRunning || pause) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextStep = step === "work" ? "break" : "work";
          setStep(nextStep);
          return nextStep === "work" ? 30 : 15;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, pause, step]);

  return (
    <div className="container">
      <div className="timer">
        <div className="buttons">
          <button
            className="controls"
            onClick={() => {
              setIsRunning((prev) => !prev);
              setStep("work");
              setTimeLeft(30);
            }}
          >
            {isRunning ? "Reset" : "Start"}
          </button>
          <button
            className={`pause ${pause ? "active" : ""}`}
            onClick={() => setPause((prev) => !prev)}
          >
            {pause ? "Continue" : "Pause"}
          </button>
          <button className={`step step-${step}`} onClick={toggleStep}>
            Next
          </button>
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
