import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function TermsOfUse() {
    const { t } = useOutletContext();

    return (
        <div style={{
            maxWidth: '800px',
            padding: '2rem',
            textAlign: 'left',
            overflowY: 'auto',
            maxHeight: '80vh',
            lineHeight: '1.6'
        }}>
            <h1 className="display-font" style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--accent)' }}>
                {t.legal.termsTitle}
            </h1>
            <div style={{ whiteSpace: 'pre-line', fontSize: '1.1rem' }}>
                {t.legal.termsContent}
            </div>
        </div>
    );
}
