import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Clock from './pages/Clock';
import Timer from './pages/Timer';
import Stopwatch from './pages/Stopwatch';
import Alarm from './pages/Alarm';
import WorldTime from './pages/WorldTime';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en-GB');

  // Apply theme to body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en-GB' ? 'de' : 'en-GB');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout
            theme={theme}
            toggleTheme={toggleTheme}
            lang={lang}
            toggleLang={toggleLang}
          />
        }>
          <Route index element={<Clock />} />
          <Route path="timer" element={<Timer />} />
          <Route path="stopwatch" element={<Stopwatch />} />
          <Route path="alarm" element={<Alarm />} />
          <Route path="world-time" element={<WorldTime />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-use" element={<TermsOfUse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
