import "../App.css";
import editModal from "../components/editModal";
import MatchesContainer from "../components/matches";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Match} from "../../types/match";
import a4Form from "../components/a4Form";
// import {useEffect, useState} from "react";

async function onLogout(navigate: Function) {
    console.log('Logging out');
    const response = await fetch('/logout', {
        method: 'GET',
    });
    if (response.ok) {
        navigate('/');
        // window.location.href='/'; // Redirect to the root URL
    } else {
        console.error('Logout failed');
    }
}

function A4Logic() {
    const navigate = useNavigate()
    const [matches, setMatches] = useState<Match[]>([]);
    return (
        <div className={"sm:flex sm:flex-col sm:justify-center sm:items-center px-5 sm:px-[30%]"}>
            <h1 className="font-black text-4xl sm:text-6xl pt-6 mb-5">Submit your Match!</h1>
            {a4Form(setMatches, matches)}
            {MatchesContainer(setMatches,matches)}
            {editModal(setMatches, matches)}

        </div>
    );
}

export default A4Logic;