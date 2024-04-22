import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
  });

  return (
    <div className="text-center mt-5">
      <h1 className="text-muted">Chat</h1>
      <Outlet />
    </div>
  );
};

export default Chat;
