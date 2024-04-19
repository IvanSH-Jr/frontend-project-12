import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/index.js';

import NotFound from './Pages/NotFound.jsx';
import Login from './Pages/Login.jsx';
import MainPage from './Pages/MainPage.jsx';
import AppComponent from './components/AppComponent.jsx';
import NavComponent from './components/NavComponent.jsx';

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
