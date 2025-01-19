import React from "react";
import CodeEditor from "@/pages/CodeEditor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Navbar from "@/components/Navbar";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question/:id" element={<CodeEditor />} />

      </Routes>    
    </>
  );
};

export default App;
