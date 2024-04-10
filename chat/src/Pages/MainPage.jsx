import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(navigate);
    if (!localStorage.getItem('token')) navigate('/login');
  });

  return (
    <div className="text-center mt-5">
      <h1 className="text-muted">MainPage</h1>
    </div>
  );
};

export default MainPage;
