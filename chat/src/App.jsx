import {
  BrowserRouter, Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './routes/routes.js';
import NotFound from './Pages/NotFound.jsx';
import Login from './Pages/Login.jsx';
import Chat from './Pages/Chat.jsx';
import Signup from './Pages/Signup.jsx';
import AppComponent from './components/AppComponent.jsx';
import NavComponent from './components/NavComponent.jsx';

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
