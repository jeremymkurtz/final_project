import RosterForm from "../components/RosterForm";
import RosterTable from "../components/RosterTable";

function Roster() {
    const hasRoster = true

    return (
        <>
            {hasRoster ? <RosterTable/> : <RosterForm/>}
        </>
    )
}

export default Roster;