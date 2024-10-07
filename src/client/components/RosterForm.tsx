import {JSX, useState} from "react";
import {School} from "../../types/school"

function RosterForm() {

    const playerHTML = (playerNum) => {
        const player = "player" + playerNum;
        const aria = "Input for Player" + playerNum;

        return (
            <div className="flex items-center col-[1]" id={player} key={playerNum}>
                <label className="w-[88px] text-left">Player {playerNum}</label>
                <input aria-label={aria + " First Name"} className="input text-white ml-2 w-40" id={player + "fn"} name={player + "fn"}
                       type="text" placeholder="First Name" required/>
                <input aria-label={aria + " Last Name"} className="input text-white ml-2 w-40" id={player + "ln"} name={player + "ln"}
                       type="text" placeholder="Last Name" required/>
            </div>
        );
    }

    const [playersHTML, setPlayersHTML] = useState<JSX.Element[]>(() => {
        const init = [];
        for(let i = 0; i <= 7; i++) {
            init[i] = playerHTML(i + 1);
        }
        return init;
    });

    const addRemovePlayerHTML = (option: string) => {
        const addRemoveIds = ["removePlayer", "addPlayer"]
        let optionNum;
        let playerNum;

        if(option == "add") {
            optionNum = 1
            playerNum = playersHTML.length + 1
            setPlayersHTML([...playersHTML, playerHTML(playerNum)]);
        }
        else if(option == "remove") {
            optionNum = 0
            playerNum = playersHTML.length - 1
            playersHTML.pop()
            setPlayersHTML([...playersHTML]);
        }

        document.getElementById("submitRoster").style.gridRow = (playerNum) + "/" + (playerNum + 2);

        if(playerNum == (13 - optionNum * 4)) {
            document.getElementById(addRemoveIds[1 - optionNum]).style.display = "block"
            document.getElementById(addRemoveIds[optionNum]).style.width = "160px"
        }
        else if(playerNum == (8 + optionNum * 6)) {
            document.getElementById(addRemoveIds[optionNum]).style.display = "none"
            document.getElementById(addRemoveIds[1 - optionNum]).style.width = "328px"
        }
    }

    const submitRoster = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const school: School = {
            coach: "",
            name: (document.getElementById("schoolName") as HTMLInputElement).value,
            abbr: (document.getElementById("abbreviation") as HTMLInputElement).value,
            players: [],
            points: 0,
            pool: ""
        };
        if(school.name == "" || school.abbr == "") {
            return alert("Please fill out every input box.");
        }

        for(let i = 0; i < playersHTML.length; i++) {
            school.players[i] = {
                fName: (document.getElementById("player" + (i + 1) + "fn") as HTMLInputElement).value,
                lName: (document.getElementById("player" + (i + 1) + "ln") as HTMLInputElement).value,
                abbr: (document.getElementById("abbreviation") as HTMLInputElement).value + (i + 1)
            };
            if (school.players[i].fName == "" || school.players[i].lName == "") {
                return alert("Please fill out every input box.");
            }
        }

        const body = JSON.stringify(school);
        console.log(body)

        await fetch( '/addRoster', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
    }

    return (
        <div className="flex justify-center">
            <form id="rosterForm" className="text-xl w-min">
                <h1 className="text-4xl text-center">Welcome Coach!</h1><br/>
                <p className="text-center">You currently do not have a roster. Please create one below.</p><br/>
                <div className="grid grid-cols-[auto,auto] gap-2">
                    <div className="flex items-center col-[1]">
                        <label className="w-32">School Name</label>
                        <input aria-label="Input for School Name" className="input text-white ml-2 w-[288px]" id="schoolName"
                               name="schoolName"
                               type="text" placeholder="School Name" required/>
                    </div>
                    <div className="flex items-center col-[2] justify-self-end">
                        <label>Abbr.</label>
                        <input aria-label="Input for Abbreviation" className="input text-white ml-2 w-[60px]" id="abbreviation"
                               name="abbreviation"
                               type="text" placeholder="ABC" maxLength={3} required/>
                    </div>
                    {playersHTML}
                    <button id="submitRoster" type="submit"
                            className={"bg-[rgb(33,68,121)] text-white col-[2] w-fit h-fit p-2 row-[8/10] flex justify-self-end self-end"}
                            onClick={submitRoster}>Submit<br/>Roster
                    </button>
                </div>
                <div className="text-white flex ml-[88px]  mt-2">
                    <button id="removePlayer" type="button"
                            className="bg-[rgb(102,29,29)] w-40 ml-2 py-1"
                            style={{display: "none"}}
                            onClick={() => {addRemovePlayerHTML("remove")}}>- Remove Player
                    </button>
                    <button id="addPlayer" type="button"
                            className="bg-[rgb(30,104,55)] w-[328px] ml-2 py-1"
                            onClick={() => {addRemovePlayerHTML("add")}}>+ Add Player
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RosterForm;