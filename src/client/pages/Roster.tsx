import RosterForm from "../components/RosterForm";
import RosterTable from "../components/RosterTable";

function Roster() {
    const roster = false

    return (
        <>
            {roster ? <RosterTable/> : <RosterForm/>}
        </>
    )
}

export default Roster;