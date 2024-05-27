import ReactDOM from 'react-dom/client';
import Init from './Init';

const chatApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await Init());
};

chatApp();
