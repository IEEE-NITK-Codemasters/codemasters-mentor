import React from "react";
import { Button } from "./components/ui/button";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Button variant="default">Click Me</Button>
    </div>
  );
};

export default App;
