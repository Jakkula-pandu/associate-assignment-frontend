import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <BrowserRouter>
        <Header />
            <Routes>   
                <Route path="/" element={<LoginPage />}></Route>
                <Route path="/Dashboard" element={<Dashboard />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
