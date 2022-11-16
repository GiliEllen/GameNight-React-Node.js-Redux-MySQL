import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./features/register/Register";
import { Page404 } from "./features/page404/Page404";
import { Login } from "./features/login/Login";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
