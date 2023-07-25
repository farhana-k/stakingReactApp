import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home'
function App() {



  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
