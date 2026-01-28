import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Timer() {
    const { t } = useOutletContext();
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [inputTime, setInputTime] = useState({ minutes: 5, seconds: 0 });

    useEffect(() => {
        let interval;
        if (isRunning && totalSeconds > 0) {
            interval = setInterval(() => {
                setTotalSeconds((prev) => prev - 1);
            }, 1000);
        } else if (totalSeconds === 0) {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, totalSeconds]);

    const startTimer = () => {
        if (totalSeconds === 0) {
            setTotalSeconds(inputTime.minutes * 60 + inputTime.seconds);
        }
        setIsRunning(true);
    };

    const pauseTimer = () => setIsRunning(false);

    const resetTimer = () => {
        setIsRunning(false);
        setTotalSeconds(inputTime.minutes * 60 + inputTime.seconds);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {totalSeconds === 0 && !isRunning ? (
                <div style={{ display: 'flex', gap: '2rem', backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label style={{ marginBottom: '0.5rem' }}>{t.timer.minutes}</label>
                        <input
                            type="number"
                            value={inputTime.minutes}
                            onChange={(e) => setInputTime({ ...inputTime, minutes: Math.max(0, parseInt(e.target.value) || 0) })}
                            style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--text-secondary)', background: 'transparent', color: 'inherit', width: '100px', textAlign: 'center', fontSize: '2rem' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label style={{ marginBottom: '0.5rem' }}>{t.timer.seconds}</label>
                        <input
                            type="number"
                            value={inputTime.seconds}
                            onChange={(e) => setInputTime({ ...inputTime, seconds: Math.max(0, parseInt(e.target.value) || 0) })}
                            style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--text-secondary)', background: 'transparent', color: 'inherit', width: '100px', textAlign: 'center', fontSize: '2rem' }}
                        />
                    </div>
                </div>
            ) : (
                <div className="display-font" style={{ fontSize: '10rem', color: totalSeconds < 10 && totalSeconds > 0 ? 'var(--danger)' : 'inherit' }}>
                    {formatTime(totalSeconds)}
                </div>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
                {!isRunning ? (
                    <button className="icon-btn" onClick={startTimer} style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '1rem 2rem' }}>
                        <Play size={32} /> <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem' }}>{t.timer.start}</span>
                    </button>
                ) : (
                    <button className="icon-btn" onClick={pauseTimer} style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 2rem' }}>
                        <Pause size={32} /> <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem' }}>{t.timer.pause}</span>
                    </button>
                )}
                <button className="icon-btn" onClick={resetTimer} style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem 2rem' }}>
                    <RotateCcw size={32} /> <span style={{ marginLeft: '0.5rem', fontSize: '1.2rem' }}>{t.timer.reset}</span>
                </button>
            </div>
        </div>
    );
}
