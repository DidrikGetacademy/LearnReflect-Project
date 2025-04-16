// src/Layout.js
import React from "react";
import Footer from "./Footer";
import "../Css/layout.css";
import { Outlet } from "react-router-dom";
export default function Layout() {
    return (
      <div className="Wrapper">
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }