import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Commponents/Home/Home";
import Register from "./Commponents/Register/Register";
import Login from "./Commponents/Login/Login";
import Navbar from "./Commponents/Navbar/Navbar";
import Notfound from "./Commponents/Notfound/Notfound";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Notfound />} />
      </Routes>

    </>
  );
}

export default App;
