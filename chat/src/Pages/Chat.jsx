import { useSelector } from 'react-redux';

const Chat = () => {
  const { token } = useSelector((state) => state.auth);
  const Authorization = `Bearer ${token}`;
  console.log(Authorization);

  return (
    <div className="text-center mt-5">
      <h1 className="text-muted">Chat</h1>
    </div>
  );
};

export default Chat;
