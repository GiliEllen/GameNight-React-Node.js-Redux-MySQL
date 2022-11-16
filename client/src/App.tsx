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


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
