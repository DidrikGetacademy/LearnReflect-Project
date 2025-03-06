import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './PreRealse/Css/App.css'
import PageComponent from './PreRealse/PageComponent.js';
import MenuBar from './PreRealse/MenuBar.js';
import ContactNavBar from './PreRealse/Contact.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Payment from './PreRealse/payment.js';
import AppLR from "./LearnReflect/AppLR.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuBar />} />
        <Route path="/PageComponent" element={<PageComponent />} />
        <Route path="/Contact" element={<ContactNavBar />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/*" element={<AppLR/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;