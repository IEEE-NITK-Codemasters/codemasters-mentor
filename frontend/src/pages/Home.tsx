// QuestionLinks.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Select a Question</h1>
      <ul>
        <li>
          <Link to="/question/1" className="dark:text-white">Question 1</Link>
        </li>
        <li>
          <Link to="/question/2" className="dark:text-white">Question 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
