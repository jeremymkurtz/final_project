import {JSX, useState} from "react";
import {Player} from "../../types/player";

function RosterTable({schoolData}) {

    const styleTable = "border-2 border-[rgb(33,68,121)] text-center w-fit py-1 px-8";

    const tableRow = (rowNum, player?) => {
        if(player) {
            return (
                <tr key={rowNum + 1} className={rowNum % 2 == 1 ? "bg-[rgb(222,235,255)]" : "bg-white"}>
                    <td className={styleTable}>{player.abbr}</td>
                    <td className={styleTable}>{player.fName + " " + player.lName}</td>
                </tr>
            )
        } else {
            return (
                <tr key={rowNum + 1} className={rowNum % 2 == 0 ? "bg-[rgb(222,235,255)]" : "bg-white"}>
                    <td className={styleTable}>{schoolData.players[rowNum].abbr}</td>
                    <td className={styleTable}>{schoolData.players[rowNum].fName + " " + schoolData.players[rowNum].lName}</td>
                </tr>
            )
        }
    }

    const [playersTable, setPlayersTable] = useState<JSX.Element[]>(() => {
        const init = [];
        for (let i = 0; i < schoolData.players.length; i++) {
            init[i] = tableRow(i);
        }
        return init;
    });

    const [showingInputs, setShowingInputs] = useState(false)

    const addPlayer = async (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();
        const rowNum = playersTable.length + 1;
        const checkEmpty = /[^ ]/;
        const checkName = /[^a-zA-Z-'. ]/;

        const player: Player = {
            fName: (document.getElementById("firstName") as HTMLInputElement).value,
            lName: (document.getElementById("lastName") as HTMLInputElement).value,
            abbr: schoolData.abbr + rowNum
        };

        if(!checkEmpty.test(player.fName)) {
            return alert("First name has no input.");
        }
        else if(checkName.test(player.fName)) {
            return alert("First name has invalid characters.");
        }

        if(!checkEmpty.test(player.lName)) {
            return alert("Last name has no input.");
        }
        else if(checkName.test(player.lName)) {
            return alert("Last name has invalid characters.");
        }

        setPlayersTable([...playersTable, tableRow(rowNum, player)]);
        setShowingInputs(false);
        (document.getElementById("inputs") as HTMLFormElement).reset();

        const body = JSON.stringify(player);
        await fetch( '/addPlayer', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
    }

    return (
        <div className="flex justify-center">
            <div><br/>
                <h1 className="text-center text-4xl">Here is your current roster,<br/>Coach <span className="font-bold">{schoolData.coach}</span>.</h1><br/>
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
                            <th id="lastRow" colSpan="2" className="w-[640px]">
                                <button id="addToRoster" type="button" className={"bg-[rgb(33,68,121)] text-white p-2 mt-2 w-full rounded-lg "
                                    + (playersTable.length < 14 && !showingInputs ? "block" : "hidden")} onClick={() => setShowingInputs(true)}>+ Add Player To Roster</button>
                                <form id="inputs" className={"mt-2 " + (showingInputs ? "flex" : "hidden")}>
                                    <input id="firstName" type="text" placeholder="First Name" required
                                           className="bg-white p-1 border-2 border-black rounded-lg font-normal w-[35%]"/>
                                    <input id="lastName" type="text" placeholder="Last Name" required
                                           className="bg-white ml-2 p-1 border-2 border-black rounded-lg font-normal w-[35%]"/>
                                    <button type="submit" className="bg-[rgb(30,104,55)] w-[15%] ml-2 p-1 rounded-lg font-bold text-white" onClick={addPlayer}>Add</button>
                                    <button type="button" className="bg-[rgb(102,29,29)] w-[15%] ml-2 p-1 rounded-lg font-bold text-white" onClick={() => {setShowingInputs(false); (document.getElementById("inputs") as HTMLFormElement).reset();}}>Cancel</button>
                                </form>
                            </th>
                        </tr>
                    </table>
                </div>
                <br/><br/>
            </div>
        </div>
    );
}

export default RosterTable;