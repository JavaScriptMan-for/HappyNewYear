import React from 'react';
import MainPage from "../pages/MainPage"
import SendToSanta from "../pages/SendToSanta"
import NewYear from "../pages/NewYear"
import { Route, Routes } from 'react-router-dom';
import "../css/App.css";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<NewYear />} />
        <Route path='/send-gift' element={<MainPage />} />
        <Route path='/send-to-SantaClaus' element={<SendToSanta />} />
      </Routes>
    </>
  )
};
export default App;




