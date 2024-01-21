import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import LoginPage from './components/LoginPage';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './components/DashBoard';

function App() {
  return (
  <>
  <Routes>
    <Route exact path='/' element={<Registration />}></Route>
    <Route exact path='/login' element={<LoginPage/>} > </Route>
    <Route exact path='/dashboard' element={<DashBoard/>} > </Route>
  </Routes>
  </>
  );
}

export default App;
