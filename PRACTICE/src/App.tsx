
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import APIdata from './components/APIdata';
import ThemeToggle from './components/ThemeToggle';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/apidata" element={<APIdata />} />
        <Route path="/themetoggle" element={<ThemeToggle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
