import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Countdown = ({ diameter = '80px', duration = 70, colors = ['#8a9b0f', '#940a3d'], onComplete }) => {
    const [remainingTime, setRemainingTime] = useState(duration);

    useEffect(() => {
        if (remainingTime === 60) {
             toast.error("1 minute remaining!");
        }
        if (remainingTime > 0) {

            const interval = setInterval(() => {
                setRemainingTime(prev => {
                    const newTime = prev - 1;
                    if (newTime <= 0) {
                        clearInterval(interval);
                        onComplete();
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [remainingTime, onComplete]);

    const size = parseInt(diameter);
    const strokeWidth = 0.1 * size;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const style = {
        container: {
            display: 'grid',
            margin: '1em auto',
            width: diameter,
            height: diameter,
            position: 'relative',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr'
        },
        time: {
            gridColumn: 1,
            gridRow: 1,
            placeSelf: 'center',
            font: `calc(0.20 * ${diameter}) / 2 ubuntu mono, consolas, monaco, monospace`
        },
        svg: {
            gridColumn: 1,
            gridRow: 1,
            transform: 'rotate(-90deg)'
        },
        circle: {
            fill: 'none',
            strokeWidth: strokeWidth,
            strokeLinecap: 'round'
        }
    };

    const greenThreshold = 0.3 * duration;
    const orangeThreshold = 0.2 * duration;
    const redThreshold = 60;

    let strokeColor;
    if (remainingTime <= redThreshold) {
        strokeColor = 'red';
    } else if (remainingTime <= orangeThreshold) {
        strokeColor = 'orange';
    } else if (remainingTime > greenThreshold) {
        strokeColor = 'green';
    } else {
        strokeColor = `color-mix(in hsl, ${colors[0]} ${(remainingTime / duration) * 100}%, ${colors[1]})`;
    }

    const progress = remainingTime / duration;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div style={style.container}>
            <svg viewBox={`0 0 ${size} ${size}`} style={style.svg}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    style={{
                        ...style.circle,
                        stroke: 'silver'
                    }}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    style={{
                        ...style.circle,
                        stroke: strokeColor,
                        strokeDasharray: strokeDasharray,
                        strokeDashoffset: -strokeDashoffset
                    }}
                />
            </svg>
            <div style={style.time}>
                {`${Math.floor(remainingTime / 3600)}:${Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0')}:${(remainingTime % 60).toString().padStart(2, '0')}`}
            </div>
        </div>
    );
};

export default Countdown;
