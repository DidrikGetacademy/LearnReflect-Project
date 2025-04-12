import React from "react";
import './LearnReflect/Css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import CountDown from "./LearnReflect/Countdown_prerealse/CountDown";
import SelfDevelopment from "./LearnReflect/LearnReflect Discipline/SelfDevelopment";
import WhitelistPage from './LearnReflect/PageComponent';
import MenuBar from './LearnReflect/MenuBar';
import ContactNavBar from './LearnReflect/Contact'; 
import Payment from './LearnReflect/payment';
import LoginPage from "./LearnReflect/User/LoginPage";
import AboutPage from "./LearnReflect/LearnReflect Discipline/AboutPage.js";
import Futures from "./LearnReflect/User/FuturesPage";
import AuthProvider from "./LearnReflect/Components/Authanciation/AuthProvider";
import Dashboard from "./LearnReflect/User/Dashboard.js";
import PrivateRoute from "./LearnReflect/Components/Authanciation/PrivateRoute.js";
import PrivateRouteFuture from "./LearnReflect/Components/Authanciation/PrivateRouteFuture.js";
import FutureZero from "./LearnReflect/LearnReflect Discipline/FutureZero.js";
import LandingPage from "./LearnReflect/MainSite/LandingPage.js";
import ShopPage from "./LearnReflect/Shop/Shop";
import ProductCard from "./LearnReflect/Shop/ProductCard.js";
import Completion from "./LearnReflect/Shop/PaymentStripe/Completion";
import AIUpscalePage from "./LearnReflect/AI-LearnReflect/AIUpscalePage.js";
import Admin from "./LearnReflect/AdminPanel/Admin.js";
import AdminRoute from "./LearnReflect/Components/Authanciation/AdminRoute.js";
import Timer from "./LearnReflect/Components/TimerComponent.js";
import Inspire from "./LearnReflect/Inspire/Inspire.js";
import RegistrationForm from "./LearnReflect/User/UserRegistration.js";
import LRAgent from "./LearnReflect/AI-LearnReflect/Chat/LRAgent.js";
import AudioEnchancerJSX from "./LearnReflect/AI-LearnReflect/Audio/AudioRender.js";
import VideoEnchancerJSX from "./LearnReflect/AI-LearnReflect/Video/VideoRender.js";
import PrivacyPolicy from "LearnReflect/PrivacyPolicy";
function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MenuBar />} />
          <Route path="/Landingpage" element={<LandingPage />} />
          <Route path="/LRAgent" element={<LRAgent />} />
          <Route path="/AudioEnchancer" element={<AudioEnchancerJSX />} />
          <Route path="/VideoEnchancerJSX" element={<VideoEnchancerJSX />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegistrationForm />} />
          <Route path="/Timer" element={<Timer />} />
          <Route path="/CountDown" element={<CountDown />} />
          <Route path="/SelfDevelopment" element={<SelfDevelopment />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/AIUpscalePage" element={<AIUpscalePage />} />
          <Route path="/FutureZero" element={<FutureZero />} />
          <Route path="/Inspire" element={<Inspire />} />
          <Route path="/Whitelist" element={<WhitelistPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/Contact" element={<ContactNavBar />} />
          <Route path="/Payment" element={<Payment />} />
          <Route
            path="/Futures"
            element={
              <PrivateRouteFuture>
                <Futures />
              </PrivateRouteFuture>
            }
          />
          <Route path="/ShopPage" element={<ShopPage />} />
          <Route path="/ProductCard" element={<ProductCard />} />
          <Route path="/Completion" element={<Completion />} />
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/Admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

        </Routes>
      </AuthProvider>
  );
}

export default App;
