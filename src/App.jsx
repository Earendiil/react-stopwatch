

import { useState, useEffect } from 'react';
import './App.css'
import Stopwatch from './Stopwatch'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode((prevMode) => !prevMode);
  }

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
    document.body.classList.toggle("light-theme", !darkMode);
  }, [darkMode]);

  return (
    <div>
      <button onClick={toggleTheme}>{!darkMode ? "Dark Mode" : "Light Mode"}</button>

      <Stopwatch className="stopwatch1" playerName="Player 1" />
      <Stopwatch className="stopwatch2" playerName="Player 2" />
      <Stopwatch className="stopwatch3" playerName="Player 3" />
    </div>
  );
}

export default App