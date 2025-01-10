import React, { useState, useEffect, useRef } from 'react';
    import { Button } from './components/ui/button';
    import { Slider } from './components/ui/slider';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
    import { Label } from './components/ui/label';

    function App() {
      const [workDuration, setWorkDuration] = useState(25);
      const [breakDuration, setBreakDuration] = useState(5);
      const [timer, setTimer] = useState(workDuration * 60);
      const [isRunning, setIsRunning] = useState(false);
      const [isWork, setIsWork] = useState(true);
      const intervalRef = useRef(null);

      useEffect(() => {
        setTimer(isWork ? workDuration * 60 : breakDuration * 60);
      }, [workDuration, breakDuration, isWork]);

      useEffect(() => {
        if (isRunning) {
          intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => {
              if (prevTimer <= 0) {
                clearInterval(intervalRef.current);
                setIsRunning(false);
                setIsWork(!isWork);
                return isWork ? breakDuration * 60 : workDuration * 60;
              }
              return prevTimer - 1;
            });
          }, 1000);
        } else {
          clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
      }, [isRunning, isWork, workDuration, breakDuration]);

      const handleStartPause = () => {
        setIsRunning(!isRunning);
      };

      const handleReset = () => {
        setIsRunning(false);
        setTimer(isWork ? workDuration * 60 : breakDuration * 60);
      };

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Card className="w-[380px]">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Pomodoro Timer</CardTitle>
              <CardDescription className="text-center">Stay focused and productive</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-4">{formatTime(timer)}</div>
              <div className="flex space-x-2 mb-4">
                <Button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</Button>
                <Button variant="secondary" onClick={handleReset}>Reset</Button>
              </div>
              <div className="w-full space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="work-duration">Work Duration (minutes)</Label>
                  <Slider
                    id="work-duration"
                    defaultValue={[workDuration]}
                    max={60}
                    step={1}
                    onValueChange={(value) => setWorkDuration(value[0])}
                  />
                  <p className="text-sm text-gray-500 text-right">{workDuration} minutes</p>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="break-duration">Break Duration (minutes)</Label>
                  <Slider
                    id="break-duration"
                    defaultValue={[breakDuration]}
                    max={20}
                    step={1}
                    onValueChange={(value) => setBreakDuration(value[0])}
                  />
                  <p className="text-sm text-gray-500 text-right">{breakDuration} minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    export default App;
