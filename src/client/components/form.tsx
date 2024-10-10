import React, { useState } from "react";
import Input from "./form/input";

export default function form() {
    const [isElimination, setIsElimination] = useState(false);

    const handleMatchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsElimination(event.target.value === "Elimination");
    };

    const add = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const input = {
            MatchType: document.querySelector('input[name="match-type"]:checked') as HTMLInputElement,
            MatchFormat: document.getElementById('match') as HTMLInputElement,
            PlayerA1: document.getElementById("playerA1") as HTMLInputElement,
            PlayerB1: document.getElementById("playerB1") as HTMLInputElement,
            PlayerA2: document.getElementById("playerA2") as HTMLInputElement,
            PlayerB2: document.getElementById("playerB2") as HTMLInputElement,
            Game1A: document.getElementById("game1A") as HTMLInputElement,
            Game1B: document.getElementById("game1B") as HTMLInputElement,
            Game2A: document.getElementById("game2A") as HTMLInputElement,
            Game2B: document.getElementById("game2B") as HTMLInputElement,
            Game3A: document.getElementById("game3A") as HTMLInputElement,
            Game3B: document.getElementById("game3B") as HTMLInputElement,
            round: document.querySelector('input[name="round"]:checked') as HTMLInputElement
        };
        const json = {
            MatchType: input.MatchType.value,
            Match: input.MatchFormat.value,
            PlayerA1: input.PlayerA1.value,
            PlayerB1: input.PlayerB1.value,
            PlayerA2: input.PlayerA2.value,
            PlayerB2: input.PlayerB2.value,
            Game1A: input.Game1A.value,
            Game1B: input.Game1B.value,
            Game2A: input.Game2A.value,
            Game2B: input.Game2B.value,
            Game3A: input.Game3A.value,
            Game3B: input.Game3B.value,
            round: input.round.value
        }
        const body = JSON.stringify(json);
        console.log(body);

        const response = await fetch('/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        });

        const data = await response.json();
        console.log(data);
    }

    return (
        <form className="">
            <h2 className="text-2xl flex justify-start items-start font-bold">Match Formatting:</h2>
            <div className="flex flex-row gap-5">
                <div className="flex flex-col">
                    <h3 className={"font-semibold"}>Match Type:</h3>
                    <div className="flex">
                        <input type="radio" id="round-robin" name="match-type" value="Round Robin" required onChange={handleMatchTypeChange} />
                        <label htmlFor="round-robin">Round Robin</label>
                    </div>
                    <div className="flex flex-row">
                        <input type="radio" id="elimination" name="match-type" value="Elimination" required onChange={handleMatchTypeChange} />
                        <label htmlFor="elimination">Elimination</label>
                    </div>
                </div>

                <div className="flex flex-col justify-start">
                    <label className="pb-1 font-semibold">Match:</label>
                    <div className="relative">
                        <select aria-label="What Match Group is this for i.e. Singles 3" id="match" name="match"
                                required
                                className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Choose Match Type</option>
                            <option value="Singles 1">Singles 1</option>
                            <option value="Singles 2">Singles 2</option>
                            <option value="Singles 3">Singles 3</option>
                            <option value="Doubles 1">Doubles 1</option>
                            <option value="Doubles 2">Doubles 2</option>
                            <option value="Doubles 3">Doubles 3</option>
                            <option value="Doubles 4">Doubles 4</option>
                        </select>
                    </div>
                </div>
                {!isElimination && (
                    <div className="flex flex-col mt-3">
                        <h3 className={"font-semibold"}>Round:</h3>
                        <div className="flex">
                            <input type="radio" id="1" name="round" value="1" required/>
                            <label htmlFor="1">1</label>
                        </div>
                        <div className="flex">
                            <input type="radio" id="2" name="round" value="2" required/>
                            <label htmlFor="2">2</label>
                        </div>
                        <div className="flex">
                            <input type="radio" id="3" name="round" value="3" required/>
                            <label htmlFor="3">3</label>
                        </div>
                        <div className="flex">
                            <input type="radio" id="4" name="round" value="4" required/>
                            <label htmlFor="4">4</label>
                        </div>
                        <div className="flex">
                            <input type="radio" id="5" name="round" value="5" required/>
                            <label htmlFor="5">5</label>
                        </div>
                    </div>
                )}
                {isElimination && (
                    <div className="flex flex-col mt-3">
                        <h3 className={"font-semibold"}>Round:</h3>
                        <div className="flex">
                            <input type="radio" id="Preliminary" name="round" value="Preliminary" required />
                            <label htmlFor="Preliminary">Preliminary</label>
                        </div>
                        <div className="flex">
                            <input type="radio" id="quarter" name="round" value="Quarter" required />
                            <label htmlFor="quarter">Quarter</label>
                        </div>
                        <div className="flex">
                            <input type="radio" id="semi" name="round" value="Semi" required />
                            <label htmlFor="semi">Semi</label>
                        </div>
                        <div className="flex">
                            <input type="radio" id="finals" name="round" value="Finals" required />
                            <label htmlFor="finals">Finals</label>
                        </div>
                    </div>
                )}
            </div>



            <div className="pt-3">
                <h3 className="font-semibold text-2xl flex justify-start">Scores:</h3>
                <div className={"grid grid-cols-3"}>
                    <p>Player 1</p>
                    <Input label="Player 1 for School A" id="playerA1" name="playerA1" placeholder="NT1" required />
                    <Input label="Player 1 for School B" id="playerB1" name="playerB1" placeholder="AND2" required />

                    <p>Player 2</p>
                    <Input label="Player 2 for School A" id="playerA2" name="playerA2" placeholder="NT2" />
                    <Input label="Player 2 for School B" id="playerB2" name="playerB2" placeholder="AND4" />

                    <p>Game 1</p>
                    <Input label="Game 1 Score for School A" id="game1A" name="game1A" type="number" placeholder="0" required min={0} />
                    <Input label="Game 1 Score for School B" id="game1B" name="game1B" type="number" placeholder="0" required min={0} />

                    <p>Game 2</p>
                    <Input label="Game 2 Score for School A" id="game2A" name="game2A" type="number" placeholder="0" required min={0} />
                    <Input label="Game 2 Score for School B" id="game2B" name="game2B" type="number" placeholder="0" required min={0} />

                    <p>Game 3</p>
                    <Input label="Game 3 Score for School A" id="game3A" name="game3A" type="number" placeholder="0" min={0} />
                    <Input label="Game 3 Score for School B" id="game3B" name="game3B" type="number" placeholder="0" min={0} />
                </div>
            </div>
            <div className="mt-2 flex justify-end items-end">
                <button type="button" id="add" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" value="Submit" onClick={add}>Submit</button>
                <button type="reset" className="ml-2 bg-white text-black border border-blue-500 rounded-md px-4 py-2 hover:bg-gray-400">Clear</button>
            </div>
        </form>
    );
}