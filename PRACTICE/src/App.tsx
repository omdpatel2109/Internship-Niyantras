
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
