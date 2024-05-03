import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { ThemeProvider } from './Components/ThemeContext';
import './css/bootstrap.css';
import Testing from './Pages/Testing';
import Dashboard from './Pages/Dashboard';
import AllProjects from './Pages/AllProjects';
import NewProject from './Pages/NewProject';
import { Logout } from './Components/Onboarding/Logout';
import TrashProjects from './Pages/TrashProjects';
import YourProjects from './Pages/YourProjects';
import ArchivedProjects from './Pages/ArchivedProjects';
import SharedProjects from './Pages/SharedProjects';
import UserProfile from './Pages/UserProfile';
import { useEffect } from 'react';
// import { NotificationProvider } from './Components/Contexts/NotificationContext';
import { ToastContainer, toast } from "react-toastify";

function App() {

  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={[<Home />]}
              path="/"
            />
            <Route element={[<Login/>]}
              path="/login"
            />
            <Route element={[<Signup/>]}
              path="/register"
            />
            <Route element={[<Testing/>]}
              path="/testing"
            />
            <Route element={[<Dashboard/>]}
              path="/dashboard"
            />
            <Route element={[<AllProjects/>]}
              path="/allProjects"
            />
            <Route element={[<NewProject/>]}
              path="/project/:projectName"
            />
            <Route element={[<TrashProjects/>]}
              path="/trashedProjects"
            />
            <Route element={[<YourProjects/>]}
              path="/yourProjects"
            />
            <Route element={[<ArchivedProjects/>]}
              path="/archivedProjects"
            />
            <Route element={[<SharedProjects/>]}
              path="/sharedProjects"
            />
            <Route element={[<UserProfile/>]}
              path="/profile"
            />
            <Route element={[<Logout/>]}
              path="/logout"
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
