import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Main from './Components/Main/Main';
import TopMenu from './Components/TopMenu/TopMenu';
import Menu from './Components/Menu/Menu';
import Queue from './Components/Queue/Queue';
import Tournaments from './Components/Tournament/Tournaments';
import SoloRankings from './Components/Rating/SoloRankings';
import DuoRankings from './Components/Rating/DuoRankings';
import Rankings from './Components/Rating/Rankings';
import Tournament from './Components/Tournament/Tournament';
import { checkUser } from './Redux/Actions/signAction';
import AuthRouter from './Components/AuthRouter/AuthRouter';
import MySpin from './Components/MySpin/MySpin';
import AuthMenu from './Components/AuthMenu/AuthMenu';
import NewTournament from './Components/Tournament/NewTournament';
import Queue2v2 from './Components/Queue/Queue2v2';
import Admin from './Components/Admin/Admin';
import AdminBan from './Components/Admin/AdminBan';


function App() {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, []);
  return (
    <div className="wrapper">
      <TopMenu />
      <div className="main">
        {user.isFetch
          ? <MySpin />
          : (
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/signin"
                element={(
                  <AuthRouter>
                    <SignIn />
                  </AuthRouter>
  )}
              />
              <Route
                path="/signup"
                element={(
                  <AuthRouter>
                    <SignUp />
                  </AuthRouter>
  )}
              />
              {user.id && (
              <>
                <Route path="/rankings" element={<Rankings />}>
                  <Route path="/rankings/solo" element={<SoloRankings />} />
                  <Route path="/rankings/duo" element={<DuoRankings />} />
                </Route>
                <Route path="/queue" element={<Queue />} />
                <Route path="/queue/2v2" element={<Queue2v2 />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/tournaments/:id" element={<Tournament />} />
                <Route path="/tournaments/:id/registration" element={<NewTournament />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/ban" element={<AdminBan />} />
              </>
              ) }
            </Routes>
          )}
      </div>
      <div className="footer">
        <AuthMenu>
          <Menu />
        </AuthMenu>
      </div>
    </div>
  );
}

export default App;
