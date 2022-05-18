import React, { useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Home.js";
import axios from "axios";

function App() {
  const endPoint = "launches";
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/" + endPoint)
      .then((res) => console.log(res));
  }, []);

  return (
    <div>
      <div>Hello world!</div>
      <Home />
    </div>
  );
}

export default App;
