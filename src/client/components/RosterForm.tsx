import {JSX, useState} from "react";
import {School} from "../../types/school"
import RosterTable from "./RosterTable";

function RosterForm({setRosterPage, coach}) {

    const input = "bg-white ml-2 p-1 border-2 border-black rounded-lg "

    const playerHTML = (playerNum) => {
        const player = "player" + playerNum;
        const aria = "Input for Player" + playerNum;

        return (
            <div className="flex items-center col-[1]" id={player} key={playerNum}>
                <label className="w-[88px] text-left">Player {playerNum}</label>
                <input aria-label={aria + " First Name"} className={input + "w-40"} id={player + "fn"} name={player + "fn"}
                       type="text" placeholder="First Name" required/>
                <input aria-label={aria + " Last Name"} className={input + "w-40"} id={player + "ln"} name={player + "ln"}
                       type="text" placeholder="Last Name" required/>
            </div>
        );
    };

    const [playersHTML, setPlayersHTML] = useState<JSX.Element[]>(() => {
        const init = [];
        for(let i = 0; i <= 7; i++) {
            init[i] = playerHTML(i + 1);
        }
        return init;
    });

    const addRemovePlayerHTML = (option: string) => {
        const addRemoveIds = ["removePlayer", "addPlayer"];
        let optionNum;
        let playerNum;

        if(option == "add") {
            optionNum = 1;
            playerNum = playersHTML.length + 1;
            setPlayersHTML([...playersHTML, playerHTML(playerNum)]);
        }
        else if(option == "remove") {
            optionNum = 0;
            playerNum = playersHTML.length - 1;
            playersHTML.pop();
            setPlayersHTML([...playersHTML]);
        }

        document.getElementById("submitRoster").style.gridRow = (playerNum) + "/" + (playerNum + 2);

        if(playerNum == (13 - optionNum * 4)) {
            document.getElementById(addRemoveIds[1 - optionNum]).style.display = "block";
            document.getElementById(addRemoveIds[optionNum]).style.width = "160px";
        }
        else if(playerNum == (8 + optionNum * 6)) {
            document.getElementById(addRemoveIds[optionNum]).style.display = "none";
            document.getElementById(addRemoveIds[1 - optionNum]).style.width = "328px";
        }
    };

    const submitRoster = async (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();
        const checkEmpty = /[^ ]/;
        const checkName = /[^a-zA-Z-'. ]/;
        const checkAbbr = /[^A-Z]/;

        const school: School = {
            coach: coach,
            name: (document.getElementById("schoolName") as HTMLInputElement).value,
            abbr: (document.getElementById("abbreviation") as HTMLInputElement).value,
            players: [],
            points: 0,
            pool: "",
            bracket: 0,
            seed: ""
        };

        if(!checkEmpty.test(school.name)) {
            return alert("School Name has no input.");
        }
        else if(checkName.test(school.name)) {
            return alert("School Name has invalid characters.");
        }

        if(!checkEmpty.test(school.abbr)) {
            return alert("School Abbreviation has no input.");
        }
        else if(checkAbbr.test(school.abbr)) {
            return alert("School Abbreviation must only contain uppercase letters.");
        }
        else if(school.abbr.length < 2) {
            return alert("School Abbreviation must be at least two characters long.");
        }

        for(let i = 0; i < playersHTML.length; i++) {
            school.players[i] = {
                fName: (document.getElementById("player" + (i + 1) + "fn") as HTMLInputElement).value,
                lName: (document.getElementById("player" + (i + 1) + "ln") as HTMLInputElement).value,
                abbr: school.abbr + (i + 1)
            };

            if(!checkEmpty.test(school.players[i].fName)) {
                return alert("Player " + (i + 1) + "'s first name has no input.");
            }
            else if(checkName.test(school.players[i].fName)) {
                return alert("Player " + (i + 1) + "'s first name has invalid characters.");
            }

            if(!checkEmpty.test(school.players[i].lName)) {
                return alert("Player " + (i + 1) + "'s last name has no input.");
            }
            else if(checkName.test(school.players[i].lName)) {
                return alert("Player " + (i + 1) + "'s last name has invalid characters.");
            }
        }

        setRosterPage(<RosterTable schoolData={school}/>)

        const body = JSON.stringify(school);
        await fetch( '/addSchool', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
    };

    return (
        <div className="flex justify-center">
            <form id="rosterForm" className="text-xl"><br/>
                <h1 className="text-4xl text-center">Welcome Coach <span className="font-bold">{coach}</span>!
                </h1><br/>
                <p className="text-2xl text-center">You currently do not have a roster.<br/>Please create one below.</p><br/>
                <div className="grid grid-cols-[auto,auto] gap-2">
                    <div className="flex items-center col-[1]">
                        <label className="w-32">School Name</label>
                        <input aria-label="Input for School Name" className={input + "w-[288px]"} id="schoolName"
                               name="schoolName"
                               type="text" placeholder="School Name" required/>
                    </div>
                    <div className="flex items-center col-[2] justify-self-end">
                        <label>Abbr.</label>
                        <input aria-label="Input for Abbreviation" className={input + "w-[60px]"} id="abbreviation"
                               name="abbreviation"
                               type="text" placeholder="ABC" maxLength={3} required/>
                    </div>
                    {playersHTML}
                    <button id="submitRoster" type="submit"
                            className={"bg-[rgb(33,68,121)] text-white col-[2] w-fit h-fit p-2 row-[8/10] flex justify-self-end self-end rounded-lg font-bold text-lg"}
                            onClick={submitRoster}>Submit<br/>Roster
                    </button>
                </div>
                <div className="text-white flex ml-[88px] mt-2">
                    <button id="removePlayer" type="button"
                            className="bg-[rgb(102,29,29)] w-40 ml-2 py-1 rounded-lg font-bold text-lg hidden"
                            onClick={() => {addRemovePlayerHTML("remove")}}>- Remove Player
                    </button>
                    <button id="addPlayer" type="button"
                            className="bg-[rgb(30,104,55)] w-[328px] ml-2 py-1 rounded-lg font-bold text-lg block"
                            onClick={() => {addRemovePlayerHTML("add")}}>+ Add Player
                    </button>
                </div><br/>
            </form>
        </div>
    );
}

export default RosterForm;