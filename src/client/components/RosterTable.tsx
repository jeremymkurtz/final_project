import {JSX, useState} from "react";

function RosterTable({schoolData}) {

    const styleTable = "border-2 border-[rgb(33,68,121)] text-center w-fit py-1 px-8";

    const tableRow = (rowNum) => {
        return (
            <tr key={rowNum + 1} className={rowNum % 2 == 0 ? "bg-[rgb(222,235,255)]" : ""}>
                <td className={styleTable}>{schoolData.players[rowNum].abbr}</td>
                <td className={styleTable}>{schoolData.players[rowNum].fName + " " + schoolData.players[rowNum].lName}</td>
            </tr>
        )
    }

    const [playersTable, setPlayersTable] = useState<JSX.Element[]>(() => {
        const init = [];
        for (let i = 0; i < schoolData.players.length; i++) {
            init[i] = tableRow(i);
        }
        return init;
    });

    return (
        <div className="flex justify-center">
            <div><br/>
                <h1 className="text-center text-4xl">Here is your current roster<br/>Coach <span className="font-bold">{schoolData.coach}</span>.</h1><br/>
                <p className="text-center text-3xl">Your pool score is <span className="font-bold">{schoolData.points}</span>.</p><br/>
                <div className="flex justify-center">
                    <table className="text-2xl">
                        <tr className="bg-[rgb(11,161,214)] text-white">
                            <th className={styleTable} colSpan="2">{schoolData.name}</th>
                        </tr>
                        <tr className="bg-[rgb(112,146,196)] text-white">
                            <th className={styleTable}>Acronym</th>
                            <th className={styleTable}>Player Names</th>
                        </tr>
                        {playersTable}
                        <tr>
                            <th colSpan="2">
                                {schoolData.players.length < 14 ? <button id="addToRoster" type="button"
                                        className="bg-[rgb(33,68,121)] text-white p-2 mt-2 w-full rounded-lg">+ Add Player To Roster
                                </button> : <></>}
                            </th>
                        </tr>
                    </table>
                </div><br/>
            </div>
        </div>
    );
}

export default RosterTable;