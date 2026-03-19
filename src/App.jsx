import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import MainNav from './components/MainNav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import PlaceholderPage from './pages/PlaceholderPage';
import './App.css';

function AppContent() {
  const [splashDone, setSplashDone] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <div className="app-layout" style={{ opacity: splashDone ? 1 : 0 }}>
        <Header />
        <MainNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Routes>
        {!isHome && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
