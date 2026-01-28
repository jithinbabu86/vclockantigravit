import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function Stopwatch() {
    const { t } = useOutletContext();
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    const handleStartPause = () => setIsRunning(!isRunning);

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxHeight: '80vh' }}>
            <div className="display-font" style={{ fontSize: '10rem', fontVariantNumeric: 'tabular-nums' }}>
                {formatTime(time)}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    className="icon-btn"
                    onClick={handleStartPause}
                    style={{ backgroundColor: isRunning ? 'var(--bg-secondary)' : 'var(--accent)', color: isRunning ? 'inherit' : 'white', padding: '1rem 2rem' }}
                >
                    {isRunning ? <><Pause size={32} /> <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem' }}>{t.stopwatch.pause}</span></> : <><Play size={32} /> <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem' }}>{t.stopwatch.start}</span></>}
                </button>

                <button
                    className="icon-btn"
                    onClick={handleLap}
                    disabled={!isRunning}
                    style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 2rem', opacity: !isRunning ? 0.5 : 1 }}
                >
                    <Flag size={32} /> <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem' }}>{t.stopwatch.lap}</span>
                </button>

                <button
                    className="icon-btn"
                    onClick={handleReset}
                    style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '1rem 2rem' }}
                >
                    <RotateCcw size={32} /> <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem' }}>{t.stopwatch.reset}</span>
                </button>
            </div>

            {laps.length > 0 && (
                <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    maxHeight: '30vh',
                    overflowY: 'auto'
                }}>
                    <h3 style={{ borderBottom: '1px solid var(--text-secondary)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>{t.stopwatch.laps}</h3>
                    {laps.map((lapTime, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--text-secondary)' }}>
                            <span>Lap {index + 1}</span>
                            <span className="display-font" style={{ fontSize: '1.2rem' }}>{formatTime(lapTime)}</span>
                        </div>
                    )).reverse()}
                </div>
            )}
        </div>
    );
}
