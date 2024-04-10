import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Pages/NotFound.jsx';
import Login from './Pages/Login.jsx';
import MainPage from './Pages/MainPage.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
