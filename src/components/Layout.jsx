import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    Clock, Timer, Watch, Globe, Bell, Moon, Sun, Languages,
    ZoomIn, ZoomOut, Maximize, Facebook, Twitter, Linkedin, Minimize, ToggleLeft, ToggleRight
} from 'lucide-react';
import { translations } from '../translations';

import CuckooClockIcon from './CuckooClockIcon';

export default function Layout({ theme, toggleTheme, lang, toggleLang }) {
    const [zoom, setZoom] = useState(1);
    const [is24Hour, setIs24Hour] = useState(false); // Default to 12 hour
    const [isFullscreen, setIsFullscreen] = useState(false);
    const t = translations[lang];

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const toggleTimeFormat = () => setIs24Hour(prev => !prev);

    const navItems = [
        { path: '/', icon: Clock, label: t.nav.clock },
        { path: '/alarm', icon: Bell, label: t.nav.alarm },
        { path: '/timer', icon: Timer, label: t.nav.timer },
        { path: '/stopwatch', icon: Watch, label: t.nav.stopwatch },
        { path: '/world-time', icon: Globe, label: t.nav.worldTime },
    ];

    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent('Check out vClock - The best online clock app!');

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            {/* Sidebar - Hidden in Fullscreen */}
            {!isFullscreen && (
                <nav style={{
                    width: 'var(--sidebar-width)',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem 0',
                    gap: '2rem',
                    borderRight: '1px solid var(--text-secondary)',
                    zIndex: 10,
                    flexShrink: 0
                }}>
                    {navItems.map(({ path, icon: Icon, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) => `icon-btn ${isActive ? 'active-nav' : ''}`}
                            title={label}
                        >
                            <Icon size={28} />
                        </NavLink>
                    ))}
                </nav>
            )}

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

                {/* Header Banner - Hidden in Fullscreen */}
                {!isFullscreen && (
                    <header style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 2rem',
                        backgroundColor: 'var(--bg-secondary)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        zIndex: 20
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                            <CuckooClockIcon size={32} color="white" strokeWidth={2.5} />
                        </div>
                        <h1 className="display-font" style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px' }}>vClock</h1>

                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {/* 12/24h Toggle */}
                            <button
                                className="icon-btn"
                                onClick={toggleTimeFormat}
                                title="Toggle 12/24 Hour Format"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}
                            >
                                <span>24H</span>
                                {is24Hour ? <ToggleRight size={24} color="var(--accent)" /> : <ToggleLeft size={24} color="var(--text-secondary)" />}
                            </button>

                            {/* Zoom Controls */}
                            <div style={{ display: 'flex', gap: '0.25rem', borderRight: '1px solid var(--text-secondary)', paddingRight: '1rem', marginRight: '0.5rem' }}>
                                <button className="icon-btn" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} title="Zoom Out">
                                    <ZoomOut size={20} />
                                </button>
                                <button className="icon-btn" onClick={() => setZoom(1)} title="Reset Zoom">
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{Math.round(zoom * 100)}%</span>
                                </button>
                                <button className="icon-btn" onClick={() => setZoom(z => Math.min(2, z + 0.1))} title="Zoom In">
                                    <ZoomIn size={20} />
                                </button>
                                <button className="icon-btn" onClick={toggleFullscreen} title="Fullscreen">
                                    <Maximize size={20} />
                                </button>
                            </div>

                            <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <button className="icon-btn" onClick={toggleLang} title="Switch Language" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>
                                <Languages size={20} />
                                <span>{lang === 'en-GB' ? 'EN-GB' : 'DE'}</span>
                            </button>
                        </div>
                    </header>
                )}

                {/* Content with Zoom */}
                <main style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${zoom})`,
                    transition: 'transform 0.2s ease-out',
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <Outlet context={{ lang, t, is24Hour }} />
                </main>

                {/* Footer - Hidden in Fullscreen */}
                {!isFullscreen && (
                    <footer style={{
                        padding: '1rem 2rem',
                        borderTop: '1px solid var(--text-secondary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'var(--bg-secondary)',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        zIndex: 20
                    }}>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <span>{t.footer.rights}</span>
                            <NavLink to="/privacy-policy" style={{ textDecoration: 'underline' }}>{t.footer.privacy}</NavLink>
                            <NavLink to="/terms-of-use" style={{ textDecoration: 'underline' }}>{t.footer.terms}</NavLink>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span>{t.footer.share}</span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Facebook">
                                    <Facebook size={18} />
                                </a>
                                <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Twitter">
                                    <Twitter size={18} />
                                </a>
                                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`} target="_blank" rel="noopener noreferrer" className="icon-btn" title="LinkedIn">
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>
                    </footer>
                )}

                {/* Floating exit button for fullscreen to ensure usability */}
                {isFullscreen && (
                    <button
                        onClick={toggleFullscreen}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            zIndex: 100,
                            opacity: 0.5,
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = 1}
                        onMouseLeave={(e) => e.target.style.opacity = 0.5}
                    >
                        <Minimize size={24} />
                    </button>
                )}
            </div>
        </div>
    );
}
