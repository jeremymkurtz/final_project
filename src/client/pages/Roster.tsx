import {useLayoutEffect, useState} from "react";
import RosterForm from "../components/RosterForm";
import RosterTable from "../components/RosterTable";

function Roster() {

    const [rosterPage, setRosterPage] = useState(<></>);

    const check = async () => {
        const verifyCoach = await fetch("/getCoach", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const coach = await verifyCoach.json();
        if (coach === 'Unauthorized') {
            setRosterPage(<>ERROR 401 UNAUTHORIZED</>);
        }
        else {
            const response = await fetch("/getSchoolData", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            setRosterPage(data == null ? <RosterForm setRosterPage={setRosterPage} coach={coach}/> : <RosterTable schoolData={data}/>);
        }
    }

    useLayoutEffect(() => {
        check();
    }, []);

    return (
        <>
            {rosterPage}
        </>
    )
}

export default Roster;