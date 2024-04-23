import {
  BrowserRouter, Routes, Route, Outlet, Navigate,
} from 'react-router-dom';

import { Provider, useSelector } from 'react-redux';
import store from './store/index.js';

import routes from './routes/routes.js';
import NotFound from './Pages/NotFound.jsx';
import Login from './Pages/Login.jsx';
import Chat from './Pages/Chat.jsx';
import AppComponent from './components/AppComponent.jsx';
import NavComponent from './components/NavComponent.jsx';

const PrivateOutlet = () => {
  const { token } = useSelector((state) => state.auth);
  console.log(token);
  return token ? <Outlet /> : <Navigate to={routes.login()} />;
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppComponent>
        <NavComponent />
        <Routes>
          <Route path={routes.notFound()} element={<NotFound />} />
          <Route path={routes.chat()} element={<PrivateOutlet />}>
            <Route path="" element={<Chat />} />
          </Route>
          <Route path={routes.login()} element={<Login />} />
        </Routes>
      </AppComponent>
    </BrowserRouter>
  </Provider>
);

export default App;
