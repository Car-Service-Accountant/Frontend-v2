import React, { useState, useEffect } from 'react';

interface ProgressiveProps {
    number: number;
}

const ProgressiveNumber = ({ number }: ProgressiveProps) => {
    const [displayedValue, setDisplayedValue] = useState(0);
    const [countingCompleted, setCountingCompleted] = useState(false);

    useEffect(() => {
        if (displayedValue < number) {
            const timer = setInterval(() => {
                setDisplayedValue((prevValue) => {
                    const nextValue = prevValue + 6;
                    if (nextValue >= number) {
                        clearInterval(timer);
                        setCountingCompleted(true);
                        return number;
                    }
                    return nextValue;
                });
            }, 3); // Adjust the interval duration for smoother or faster transition
            if (displayedValue > number) {
                setDisplayedValue(number)
                clearInterval(timer);
                setCountingCompleted(true);
            }
            return () => {
                clearInterval(timer);
            };
        }
    }, [number, displayedValue]);

    return <>+ {countingCompleted ? number : displayedValue}</>;
};

export default ProgressiveNumber;