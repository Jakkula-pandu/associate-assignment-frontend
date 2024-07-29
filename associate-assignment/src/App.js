import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import store from './store/store';
import Users from './components/Users/Users';
import UserDashboard from './components/UserScreens/UserDashboard/UserDashboard';
import { Provider } from 'react-redux';

const App = () => (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Users" element={<Users />} /> 
          <Route path="/UserDashboard" element={<UserDashboard/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
  
  export default App;