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
import LoginPage from './routes/LoginPage';
import LoginProvider from './components/contexts/LoginProvider';
import ManagePage from './routes/ManagePage';
import CreatePage from './routes/CreatePage';
import OwnPage from './routes/OwnPage';
import ViewPostPage from './routes/ViewPostPage';
import EditPage from './routes/EditPage';
import ServerViewPage from './routes/ServerViewPage';

const App = () => {
  return (
    <LoginProvider>
      <Main />;
    </LoginProvider>
  )
};

const Main = () => {
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
                      <Route path="/server" element={<ServerViewPage />} />
                      <Route path="/posts" element={<PostsPage />} />
                      <Route path="/view" element={<ViewPostPage />} />
                      <Route path="/edit" element={<EditPage />} />
                      <Route path="/info" element = {<InfoPage />} />
                      <Route path='/register' element = {<RegisterPage />} />
                      <Route path='/login' element = {<LoginPage />} />
                      <Route path="/manage" element={<ManagePage />} />
                      <Route path="/create" element={<CreatePage />} />
                      <Route path="/own" element={<OwnPage />} />
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
