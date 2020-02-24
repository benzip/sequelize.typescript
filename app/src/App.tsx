import React from "react";
import Layout1 from "./layout/layout1";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Layout1></Layout1>
      </Router>
    </React.Fragment>
  );
}

export default App;
