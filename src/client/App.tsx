import "./App.css";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/header";
import A4Logic from "./pages/a4-logic";
import GameSubmission from "./pages/GameSubmission";
import Home from "./pages/Home";
import Login from "./pages/login";

import "./App.css";
import Brackets from "./pages/Brackets";
import Dashboard from "./pages/dashboard";

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
                    <Route path="/a4-logic" element={<A4Logic />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
