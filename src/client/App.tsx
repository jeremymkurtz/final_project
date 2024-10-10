import "./App.css";

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Roster from "./pages/Roster"
import Header from "./components/header";
import A4Logic from "./pages/a4-logic";
import GameSubmission from "./pages/GameSubmission";
import Home from "./pages/Home";
import Login from "./pages/login";

import Brackets from "./pages/Brackets";
import DashboardS from "./pages/Dashboard-s";
import RoundRobinPage from "./pages/RoundRobinPage";

function App() {

    return (
        <>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game-submission" element={<GameSubmission />} />
                    <Route path="/round-robin" element={<RoundRobinPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/roster" element={<Roster />} />
                    <Route path="/brackets" element={<Brackets/>}/>
                    <Route path="/a4-logic" element={<A4Logic />} />
                    <Route path="/dashboard" element={<DashboardS />} />
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
