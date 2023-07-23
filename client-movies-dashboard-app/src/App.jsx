import React from "react";
import { RouterProvider } from "react-router-dom";
import { apRouter } from "./routes/Routing";

const App = () => {
  return <RouterProvider router={apRouter} />;
};

export default App;
