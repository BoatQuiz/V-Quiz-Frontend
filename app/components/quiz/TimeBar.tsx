import { useState, useEffect } from "react";

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

  // This effect starts the countdown when isRunning becomes true
  useEffect(() => {

    // If the timer is not running, exit early
    if (!isRunning) return;

    // Create an interval that runs every 100 milliseconds
    const interval = setInterval(() => {

      // Decrease timeLeft by 100ms each tick
      setTimeLeft(prev => prev - 100);

    }, 100);

    // Cleanup function:
    // This clears the interval when:
    // - the component unmounts
    // - isRunning changes
    return () => clearInterval(interval);

  }, [isRunning]); // Re-run this effect whenever isRunning changes


  // This effect checks if time has run out
  useEffect(() => {

    // When timeLeft reaches 0 or below,
    // trigger the onTimeUp callback
    if (timeLeft <= 0) {
      onTimeUp();
    }

  }, [timeLeft, onTimeUp]); // Runs whenever timeLeft changes


  // This effect resets the timer whenever duration changes
  useEffect(() => {

    // Reset timeLeft to the new duration value
    setTimeLeft(duration);

  }, [duration]); // Runs whenever duration prop changes
  
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
);}