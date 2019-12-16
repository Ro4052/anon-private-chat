import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState("unset");

  useEffect(() => {
    axios.get("/init").then(res => setData(res.data));
  });

  return <span>{data}</span>;
};

export default App;
