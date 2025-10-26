import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EnzymePage from "./pages/EnzymePage";
import TransformationPage from "./pages/TransformationPage";

export default function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transformation" element={<TransformationPage />} />
            <Route path="/enzyme" element={<EnzymePage />} />
        </Routes>
      </Router>
  );
}