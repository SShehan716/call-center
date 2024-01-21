import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
