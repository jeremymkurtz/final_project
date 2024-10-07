import "./App.css";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./pages/login";
import A4Logic from "./pages/a4-logic";
import Header from "./components/header";
import Home from "./pages/Home";
import GameSubmission from "./pages/GameSubmission";

import Dashboard from "./pages/dashboard";
import Brackets from "./pages/Brackets";
import DashboardS from "./pages/Dashboard-s";

function App() {

    return (
        <>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game-submission" element={<GameSubmission />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/brackets" element={<Brackets/>}/>
                    <Route  path="/a4-logic" element={<A4Logic />} />
                    <Route  path="/dashboard" element={<DashboardS />} />
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
