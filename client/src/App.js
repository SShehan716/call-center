import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import Login from './pages/Login';
import UploadData from './pages/UploadData';
import './styles/global.css';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
        {window.location.pathname !== '/' && (
          <>
            <SideBar isSidebar={isSidebar} />
            <main className="content">
              <TopBar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/upload-data" element={<UploadData />} />
              </Routes>
            </main>
          </>
        )}
        {window.location.pathname === '/' && <Login />}
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
