import { useState, useEffect } from "react";

type TMode = "focus" | "shortBreak" | "longBreak";

interface IConfig {
  focusTime?: number;
  shortBreakTime?: number;
  longBreakTime?: number;
  roundLimit?: number;
}

export function usePomodoro(config?: IConfig) {
  const focus = config?.focusTime ?? 30;
  const short = config?.shortBreakTime ?? 15;
  const long = config?.longBreakTime ?? 60;
  const roundLimit = config?.roundLimit ?? 4;

  const [mode, setMode] = useState<TMode>("focus");
  const [timeLeft, setTimeleft] = useState<number>(focus);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning((prev) => !prev);

  const reset = () => {
    setIsRunning(false);
    setRound(1);
    setTimeleft(focus);
    setMode("focus");
  };

  const getNextMode = (currentMode: TMode, currentRound: number): TMode => {
    if (currentMode === "focus") {
      return currentRound >= roundLimit ? "longBreak" : "shortBreak";
    }
    return "focus";
  };

  const getTimeInterval = (mode: TMode): number => {
    return mode === "focus" ? focus : mode === "shortBreak" ? short : long;
  };

  const switchMode = () => {
    const prevRound = round;
    if (mode === "focus") {
      const nextRound = prevRound >= roundLimit ? 1 : prevRound + 1;
      setRound(nextRound);
    }
    const nextMode = getNextMode(mode, round);
    setMode(nextMode);
    setTimeleft(getTimeInterval(nextMode));
  };

  const skip = () => {
    switchMode();
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeleft((prev) => {
        if (prev <= 1) {
          setTimeout(() => {
            switchMode();
          }, 300);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, mode, round]);

  return {
    mode,
    timeLeft,
    isRunning,
    round,
    start,
    pause,
    reset,
    skip,
  };
}
