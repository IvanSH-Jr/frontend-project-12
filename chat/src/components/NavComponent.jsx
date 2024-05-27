import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserAuth } from '../store/slices/authSlice';
import routes from '../routes/routes';

const NavComponent = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(setUserAuth({ token: null, username: null }));
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to={routes.chat()}>
          Hexlet Chat
        </Link>
        {token && (<button type="button" className="btn btn-primary" onClick={handleLogOut}>Выйти</button>)}
      </div>
    </nav>
  );
};

export default NavComponent;
