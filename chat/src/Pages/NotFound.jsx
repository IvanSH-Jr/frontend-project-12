import { Link } from 'react-router-dom';
import img404 from '../assets/page404.png';

const NotFound = () => (
  <div className="text-center mt-5">
    <img src={img404} alt="Страница не найдена" className="img-fluid" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <Link to="/">на главную страницу</Link>
    </p>
  </div>
);

export default NotFound;
