import { useState, useEffect, useRef } from "react";

// Define the props that the TimeBar component expects
type TimeBarProps = {
  duration: number;       // Total time in milliseconds that the timer should run
  onTimeUp: () => void;   // Callback function that runs when time reaches 0
  isRunning: boolean;     // Controls whether the timer should actively count down
};

export function TimeBar({ duration, onTimeUp, isRunning }: TimeBarProps) {

  // State to keep track of how much time is left
  // It is initialized with the full duration
  const [timeLeft, setTimeLeft] = useState(duration);

  // Ref to remember when the timer started, WITHOUT triggering re-renders when it changes
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning || startTimeRef.current === null) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current!;
      const remaining = duration - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, duration]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
    }
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(duration);
    startTimeRef.current = Date.now();
  }, [duration]);

  const percent = (timeLeft / duration) * 100;
  const barColor = percent > 50
    ? "bg-emerald-400"
    : percent > 20
    ? "bg-yellow-400"
    : "bg-rose-400";

  return (
    <div className="app-container">

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}