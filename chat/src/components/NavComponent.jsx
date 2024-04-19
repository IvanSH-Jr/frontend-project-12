import { Link } from 'react-router-dom';

const NavComponent = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Hexlet Chat
      </Link>
    </div>
  </nav>
);

export default NavComponent;
