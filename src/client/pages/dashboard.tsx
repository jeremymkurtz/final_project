import "../App.css";
import editModal from "../components/editModal";
import form from "../components/form";
import MatchesContainer from "../components/matches";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Match} from "../../types/match";
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

function Dashboard() {
    const navigate = useNavigate()
    const [matches, setMatches] = useState<Match[]>([]);
    return (
        <>
            <h1 className="title is-family-primary is-size-1 pt-6 is-flex is-flex-direction-row">Submit your Match!
                <button id="logoutButton" className="button is-info" onClick={() =>onLogout(navigate)}>Logout</button>
            </h1>
            <div>

                {form(setMatches, matches)}
                {MatchesContainer(setMatches, matches)}
                {editModal(setMatches, matches)}

            </div>
        </>
    );
}

export default Dashboard;