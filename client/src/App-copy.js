// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Routes, Route, Link } from 'react-router-dom';
// import { Container } from 'reactstrap';
// import './App.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import SignIn from './Components/SignIn/SignIn';
// import SignUp from './Components/SignUp/SignUp';
// import Main from './Components/Main/Main';
// import TopMenu from './Components/TopMenu/TopMenu';
// import Menu from './Components/Menu/Menu';
// import Queue from './Components/Queue/Queue';
// import Registration from './Components/Registration/Registration';
// import Tournaments from './Components/Tournament/Tournaments';
// import SoloRankings from './Components/Rating/SoloRankings';
// import DuoRankings from './Components/Rating/DuoRankings';
// import Rankings from './Components/Rating/Rankings';
// import Tournament from './Components/Tournament/Tournament';
// import { checkUser } from './Redux/Actions/signAction';
// import AuthRouter from './Components/AuthRouter/AuthRouter';
// import MySpin from './Components/MySpin/MySpin';

// function App() {
//   const { user } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(checkUser());
//   }, []);
//   return (
//     <Container>
//       <TopMenu />
//       {user.isFetch
//         ? <MySpin />
//         : (
//           <Routes>
//             <Route path="/" element={<Main />} />
//             <Route
//               path="/signin"
//               element={(
//                 <AuthRouter>
//                   <SignIn />
//                 </AuthRouter>
// )}
//             />
//             <Route
//               path="/signup"
//               element={(
//                 <AuthRouter>
//                   <SignUp />
//                 </AuthRouter>
// )}
//             />
//             <Route path="/rankings" element={<Rankings />}>
//               <Route path="/rankings/solo" element={<SoloRankings />} />
//               <Route path="/rankings/duo" element={<DuoRankings />} />
//             </Route>
//             <Route path="/queue" element={<Queue />} />
//             <Route path="/tournaments" element={<Tournaments />} />
//             <Route path="/tournaments/:id" element={<Tournament />} />
//           </Routes>
//         )}
//       <Menu />
//     </Container>
//   );
// }

// export default App;
