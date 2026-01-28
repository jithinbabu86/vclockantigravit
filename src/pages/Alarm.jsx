import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Bell, Trash2, Plus } from 'lucide-react';

export default function Alarm() {
    const { t, is24Hour } = useOutletContext();
    const [alarms, setAlarms] = useState([]);
    const [newAlarmTime, setNewAlarmTime] = useState('07:00'); // Always stored as HH:mm 24h

    // 12h input states
    const [hour12, setHour12] = useState('07');
    const [minute12, setMinute12] = useState('00');
    const [period, setPeriod] = useState('AM');

    useEffect(() => {
        // Sync 12h states with 24h time when switching modes or init
        const [h, m] = newAlarmTime.split(':');
        let hInt = parseInt(h);
        const p = hInt >= 12 ? 'PM' : 'AM';
        if (hInt > 12) hInt -= 12;
        if (hInt === 0) hInt = 12;
        setHour12(hInt.toString().padStart(2, '0'));
        setMinute12(m);
        setPeriod(p);
    }, []); // Only on mount needed really, or we rely on the submit.

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();

            alarms.forEach(alarm => {
                const nowStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                if (alarm.enabled &&
                    alarm.time === nowStr &&
                    now.getSeconds() === 0) {
                    alert(`Alarm! ${alarm.label}`);
                }
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [alarms]);

    const addAlarm = () => {
        let finalTime = newAlarmTime;

        if (!is24Hour) {
            // Convert 12h inputs to 24h string
            let h = parseInt(hour12);
            if (period === 'PM' && h !== 12) h += 12;
            if (period === 'AM' && h === 12) h = 0;
            finalTime = `${h.toString().padStart(2, '0')}:${minute12}`;
        }

        setAlarms([...alarms, { id: Date.now(), time: finalTime, enabled: true, label: 'Alarm' }]);
    };

    const toggleAlarm = (id) => {
        setAlarms(alarms.map(alarm =>
            alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
        ));
    };

    const deleteAlarm = (id) => {
        setAlarms(alarms.filter(alarm => alarm.id !== id));
    };

    const formatDisplayTime = (timeStr) => {
        if (is24Hour) return timeStr;
        const [h, m] = timeStr.split(':');
        let hInt = parseInt(h);
        const p = hInt >= 12 ? 'PM' : 'AM';
        if (hInt > 12) hInt -= 12;
        if (hInt === 0) hInt = 12;
        return `${hInt}:${m} ${p}`;
    };

    const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%', maxWidth: '600px' }}>

            {/* Input Section */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '1rem' }}>
                {is24Hour ? (
                    <input
                        type="time"
                        value={newAlarmTime}
                        onChange={(e) => setNewAlarmTime(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', fontSize: '2rem', fontFamily: 'inherit', color: 'var(--text-primary)', background: 'transparent' }}
                    />
                ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <select
                            value={hour12}
                            onChange={(e) => setHour12(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', fontSize: '2rem', fontFamily: 'inherit', color: 'var(--text-primary)', background: 'transparent' }}
                        >
                            {hourOptions.map(h => <option key={h} value={h} style={{ color: 'black' }}>{h}</option>)}
                        </select>
                        <span style={{ fontSize: '2rem' }}>:</span>
                        <select
                            value={minute12}
                            onChange={(e) => setMinute12(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', fontSize: '2rem', fontFamily: 'inherit', color: 'var(--text-primary)', background: 'transparent' }}
                        >
                            {minuteOptions.map(m => <option key={m} value={m} style={{ color: 'black' }}>{m}</option>)}
                        </select>
                        <button
                            onClick={() => setPeriod(p => p === 'AM' ? 'PM' : 'AM')}
                            style={{ fontSize: '1.5rem', padding: '0.5rem', border: '1px solid var(--accent)', borderRadius: '0.5rem', color: 'var(--accent)' }}
                        >
                            {period}
                        </button>
                    </div>
                )}

                <button className="icon-btn" onClick={addAlarm} style={{ backgroundColor: 'var(--accent)', color: 'white' }} title={t.alarm.add}>
                    <Plus size={32} />
                </button>
            </div>

            {/* Alarm List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                {alarms.map(alarm => (
                    <div key={alarm.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        backgroundColor: 'var(--bg-secondary)',
                        opacity: alarm.enabled ? 1 : 0.5
                    }}>
                        <div className="display-font" style={{ fontSize: '3rem' }}>
                            {formatDisplayTime(alarm.time)}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={alarm.enabled}
                                    onChange={() => toggleAlarm(alarm.id)}
                                    style={{ width: '20px', height: '20px' }}
                                />
                                <span>{alarm.enabled ? t.alarm.on : t.alarm.off}</span>
                            </label>
                            <button className="icon-btn" onClick={() => deleteAlarm(alarm.id)} style={{ color: 'var(--danger)' }}>
                                <Trash2 size={24} />
                            </button>
                        </div>
                    </div>
                ))}
                {alarms.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{t.alarm.noAlarms}</div>}
            </div>
        </div>
    );
}
