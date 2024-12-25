import React from "react";
import CodeEditor from "@/pages/CodeEditor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question/1" element={<CodeEditor />} />
      <Route path="/question/2" element={<CodeEditor />} />

        </Routes>
      </Router>
    
    </div>
  );
};

export default App;
