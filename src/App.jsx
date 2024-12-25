import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showHours, setShowHours] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 10;
          // Check if we need to show hours (time >= 60 minutes)
          setShowHours(newTime >= 3600000);
          return newTime;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const formatNumber = (num) => num.toString().padStart(2, '0');
  const splitDigits = (num) => formatNumber(num).split('');

  const handleStartStop = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setShowHours(false);
  };

  const TimeDigit = ({ digit }) => (
    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-2 sm:p-3 md:p-4 
                    w-10 sm:w-12 md:w-16 h-16 sm:h-20 md:h-24 
                    flex items-center justify-center shadow-lg border border-gray-700">
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-700 to-transparent opacity-10 rounded-t-xl" />
      <span className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold bg-gradient-to-b from-white to-gray-300 text-transparent bg-clip-text">
        {digit}
      </span>
    </div>
  );

  const Separator = () => (
    <div className="flex flex-col justify-center gap-2 sm:gap-3 px-1 sm:px-2">
      <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-indigo-500" />
      <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-indigo-500" />
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Card className="p-4 sm:p-8 md:p-12 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-2xl 
                      mx-2 sm:mx-4">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
          {/* Time Display */}
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 opacity-5 blur-2xl" />
            
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Hours - Only shown when time exceeds 60 minutes */}
              {showHours && (
                <>
                  <div className="flex gap-1 sm:gap-2">
                    {splitDigits(hours).map((digit, idx) => (
                      <TimeDigit key={`h${idx}`} digit={digit} />
                    ))}
                  </div>
                  <Separator />
                </>
              )}
              
              {/* Minutes */}
              <div className="flex gap-1 sm:gap-2">
                {splitDigits(minutes).map((digit, idx) => (
                  <TimeDigit key={`m${idx}`} digit={digit} />
                ))}
              </div>
              
              <Separator />
              
              {/* Seconds */}
              <div className="flex gap-1 sm:gap-2">
                {splitDigits(seconds).map((digit, idx) => (
                  <TimeDigit key={`s${idx}`} digit={digit} />
                ))}
              </div>
              
              <Separator />
              
              {/* Milliseconds */}
              <div className="flex gap-1 sm:gap-2">
                {splitDigits(milliseconds).map((digit, idx) => (
                  <TimeDigit key={`ms${idx}`} digit={digit} />
                ))}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Button
              onClick={handleStartStop}
              className={`h-12 w-full sm:w-32 transition-all duration-300 ${
                isRunning 
                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/20'
              } shadow-lg`}
            >
              <div className="flex items-center justify-center gap-2">
                {isRunning ? (
                  <>
                    <Pause className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span className="text-sm sm:text-base">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 sm:h-5 w-4 sm:w-5" />
                    <span className="text-sm sm:text-base">Start</span>
                  </>
                )}
              </div>
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-12 w-full sm:w-32 border-gray-600 hover:bg-gray-700 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <RotateCcw className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="text-sm sm:text-base">Reset</span>
              </div>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Stopwatch;