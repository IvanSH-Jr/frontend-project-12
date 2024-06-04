import {
  BrowserRouter, Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../routes/routes.js';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import Signup from './Signup.jsx';
import AppComponent from './AppComponent.jsx';
import NavComponent from './NavComponent.jsx';

const PrivateOutlet = () => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Outlet /> : <Navigate to={routes.login()} />;
};

const App = () => (
  <BrowserRouter>
    <AppComponent>
      <NavComponent />
      <Routes>
        <Route path={routes.notFound()} element={<NotFound />} />
        <Route path={routes.chat()} element={<PrivateOutlet />}>
          <Route path="" element={<Chat />} />
        </Route>
        <Route path={routes.login()} element={<Login />} />
        <Route path={routes.signup()} element={<Signup />} />
      </Routes>
    </AppComponent>
  </BrowserRouter>
);

export default App;
