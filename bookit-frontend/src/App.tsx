import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      {/* Pass setSearchTerm to Navbar */}
      <Navbar onSearch={setSearchTerm} />
      <Routes>
        {/* Pass searchTerm to Home */}
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}
