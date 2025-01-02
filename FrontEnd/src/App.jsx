import { useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard_Components/Dashboard";
import Setting from "./Components/Dashboard_Components/Setting";
import Createform from "./Components/Forms_Components/Createform";
import Responce from "./Components/Forms_Components/Responce";
import Details from "./Components/Forms_Components/Details";
import Thankyou from "./Components/Forms_Components/Thankyou";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/createform" element={<Createform />} />
        <Route path="/response/:formid/*" element={<Responce />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
