import React from "react";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
    <AppRoutes />;
    console.log("NEW BUILD");
console.log(import.meta.env.VITE_API_URL);
    </>

  )
  
  
};

export default App;