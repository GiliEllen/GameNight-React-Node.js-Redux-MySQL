import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./features/register/Register";
import { Page404 } from "./features/page404/Page404";
import { Login } from "./features/login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { userSelector } from "./features/loggedInUser/loggedInUser";
import { useEffect } from "react";
import { login } from "./features/loggedInUser/userAPI";
import HomePage from './features/homePage/HomePage';
import Dashboard from './components/dashboard/Dashboard';


function App() {

  const loggedInUser = useAppSelector(userSelector)

  return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-game-nights" element={<HomePage />} />
          <Route path="/my-games" element={<HomePage />} />
          <Route path="/find-games" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
