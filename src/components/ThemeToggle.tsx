import { Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme-mode') || 'light';
    const root = document.documentElement;
    root.setAttribute('data-color-mode', savedTheme);
    setIsDark(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentMode = root.getAttribute('data-color-mode');
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-color-mode', newMode);
    localStorage.setItem('theme-mode', newMode);
    setIsDark(newMode === 'dark');
  };

  return (
    <Button 
      onClick={toggleTheme} 
      variant="ghost" 
      size="sm"
      color="white"
      _hover={{ bg: 'gray.700' }}
    >
      {isDark ? '☀️' : '🌙'}
    </Button>
  );
};

export default ThemeToggle;
