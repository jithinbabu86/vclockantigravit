import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const CITIES = [
    'Europe/London',
    'Europe/Berlin',
    'America/New_York',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Pacific/Auckland'
];

export default function WorldTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            width: '100%',
            maxWidth: '1000px',
            padding: '2rem'
        }}>
            {CITIES.map(timezone => {
                const timeInZone = new Date(time.toLocaleString('en-US', { timeZone: timezone }));
                // Clean City Name
                const city = timezone.split('/')[1].replace('_', ' ');

                return (
                    <div key={timezone} style={{
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>{city}</h3>
                        <div className="display-font" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                            {format(timeInZone, 'HH:mm')}
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
                            {format(timeInZone, 'EEE, MMM d')}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
