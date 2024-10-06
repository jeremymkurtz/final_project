import {JSX, useState} from "react";

function Roster() {

    const playerHTML = (playerNum) => {
        const player = "player" + playerNum;
        const aria = "Input for Player" + playerNum;

        return (
            <div className="flex items-center col-[1]" id={player} key={playerNum}>
                <label className="w-[88px] text-left">Player {playerNum}</label>
                <input aria-label={aria + " First Name"} className="input ml-1 w-40" id={player + "fn"} name={player + "fn"}
                       type="text" placeholder="First Name" required/>
                <input aria-label={aria + " Last Name"} className="input ml-1 w-40" id={player + "ln"} name={player + "ln"}
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

    const addPlayerHTML = () => {
        const playerNum = playersHTML.length + 1;
        setPlayersHTML([...playersHTML, playerHTML(playerNum)]);
        document.getElementById("submitRoster").style.gridRow = (playerNum) + "/" + (playerNum + 2);
        if(playerNum == 14) {
            document.getElementById("addPlayer").remove();
        }
    }

    const submitRoster = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const players = [];
        for(let i = 0; i < playersHTML.length; i++) {
            players[i] = {
                fname: (document.getElementById("player1fn") as HTMLInputElement).value,
                lname: (document.getElementById("player1ln") as HTMLInputElement).value,
                abbr: (document.getElementById("abbreviation") as HTMLInputElement).value + (i + 1)
            }
        }

        const school = {
            name: (document.getElementById("schoolName") as HTMLInputElement).value,
            abbr: (document.getElementById("abbreviation") as HTMLInputElement).value,
            players: players,
            points: 0
        };

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
                <p className="text-center">You currently do not have a roster, please create one below.</p><br/>
                <div className="grid grid-cols-[auto,auto] gap-2 mb-2">
                    <div className="flex items-center col-[1]">
                        <label className="w-32">School Name</label>
                        <input aria-label="Input for School Name" className="input ml-1 w-[284px]" id="schoolName"
                               name="schoolName"
                               type="text" placeholder="School Name" required/>
                    </div>
                    <div className="flex items-center col-[2] justify-self-end">
                        <label>Abbr.</label>
                        <input aria-label="Input for Abbreviation" className="input ml-1 w-[60px]" id="abbreviation"
                               name="abbreviation"
                               type="text" placeholder="ABR" maxLength={3} required/>
                    </div>
                    {playersHTML}
                    <button id="submitRoster" type="submit"
                            className={"bg-[rgb(33,68,121)] col-[2] w-fit h-fit p-2 row-[8/10] flex justify-self-end self-end"} onClick={submitRoster}>Submit<br/>Roster
                    </button>
                </div>
                <button id="addPlayer" type="button"
                        className="bg-[rgb(30,104,55)] flex justify-center ml-[174px] py-1 w-40" onClick={addPlayerHTML}>+ Add Player
                </button>
            </form>
        </div>
    );
}

export default Roster;