import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import Login from "./pages/Login";
import UploadData from "./pages/UploadData";
import "./styles/global.css";
import { auth } from "./firebase";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, setLoading } from "./features/userSlice";

function App() {
  const [theme, colorMode] = useMode();

  //redux
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            email: authUser.email,
          })
        );
        dispatch(setLoading(false));
      } else {
        console.log("user not logged in");
      }
    });
  }, []);

  const user = useSelector((state) => state.data.user.user);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          {user ? <SideBar /> : null}
          <main className="content">
            {user ? <TopBar />: null}
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Login />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/upload-data" element={<UploadData />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
