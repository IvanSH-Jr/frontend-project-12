import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Pages/NotFound.jsx';
import Login from './Pages/Login.jsx';
import MainPage from './Pages/MainPage.jsx';
import AppComponent from './componentsHTML/AppComponent.jsx';
import NavComponent from './componentsHTML/NavComponent.jsx';

const App = () => (
  <BrowserRouter>
    <AppComponent>
      <NavComponent />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppComponent>
  </BrowserRouter>
);

export default App;
