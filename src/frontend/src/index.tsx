import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import Home from './routes/HomePage';
import ProfilePage from './routes/ProfilePage';
import NotFoundPage from './routes/NotFoundPage';
import Servers from './routes/ServersPage';
import InfoPage from './routes/InfoPage';
import reportWebVitals from './reportWebVitals';
import RegisterPage from './routes/RegisterPage';
import PostsPage from './routes/PostsPage';

const App = () => {
  /*return (
      <NotificationProvider>
          <LoginProvider>
              <Main />
          </LoginProvider>
      </NotificationProvider>
  );*/
  return <Main />;
};

const Main = () => {
  /*
  const [loginStatus, login] = useCookieLogin();
  const { notificationDispatch } = useContext(NotificationContext);

  useEffectAsync(login, []);
  useEffect(() => {
      if(loginStatus instanceof Failed) {
          console.error('Error communicating with the server', loginStatus.error);
          notificationDispatch({ type: 'addError', message: 'Hiba a szerverrel való kommunikációban' });
      }

  }, [loginStatus]);

  if(loginStatus instanceof Idle || loginStatus instanceof Loading) return <p>Loading...</p>;

  */
  React.useEffect(() => {
    document.title = "Peer-to-peer piac portál";
 }, []);
  return (
      <Router>
          <div className="main-layout">
              <div className="main-content">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/servers" element={<Servers />} />
                      <Route path="/posts" element={<PostsPage />} />
                      <Route path="/info" element = {<InfoPage />} />
                      <Route path='/register' element = {<RegisterPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                  </Routes>
              </div>
          </div>
      </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
