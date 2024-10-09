import { useEffect, useState } from "react";
import Bracket from "../components/bracket/bracket";
import BracketColumn from "../components/bracket/bracketColumn";

export default function Brackets() {
    const [seeds, setSeeds] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        async function checkStartBracket() {
            try {
                const response = await fetch('/getStartBracket');
                if (response.ok) {
                    fetchSeeds();
                } else {
                    console.error('Start bracket check failed');
                }
            } catch (error) {
                console.error('Error checking start bracket:', error);
            }
        }

        async function fetchSeeds() {
            try {
                const response = await fetch('/getSeeds');
                if (response.ok) {
                    const data = await response.json();
                    setSeeds(data);
                } else {
                    console.error('Failed to fetch seeds');
                }
            } catch (error) {
                console.error('Error fetching seeds:', error);
            }
        }

        checkStartBracket();
    }, []);

    return (
        <div>
            <h1 className={"text-6xl"}>Brackets</h1>

            <div className={"grid grid-cols-5"}>
                <BracketColumn round={"preliminary"}>
                    {/*Top Half*/}
                    <Bracket name={seeds["1A"] || "Seed 1A"} subtitle={"1A"} color="#000"/>
                    <Bracket name={"BYE"} subtitle={"BYE"} color="#000"/>
                    <Bracket name={seeds["5A"] || "Seed 5A"} subtitle={"5A"} color="#000"/>
                    <Bracket name={seeds["4B"] || "Seed 4B"} subtitle={"4B"} color="#000"/>
                    <Bracket name={seeds["3A"] || "Seed 3A"} subtitle={"3A"} color="#000"/>
                    <Bracket name={seeds["6B"] || "Seed 6B"} subtitle={"6B"} color="#000"/>
                    <Bracket name={"BYE"} subtitle={"BYE"} color="#000"/>
                    <Bracket name={seeds["2B"] || "Seed 2B"} subtitle={"2B"} color="#000"/>
                </BracketColumn>
                <BracketColumn round={"quarter"}>
                    {/*Top Half*/}
                    <Bracket name={"1"} color="green"></Bracket>
                    <Bracket name={"2"} color="green"></Bracket>
                    <Bracket name={"3"} color="green"></Bracket>
                    <Bracket name={"4"} color="green"></Bracket>
                </BracketColumn>
                <BracketColumn round={"semi"}>
                    <Bracket name={"1"} ></Bracket>
                    <Bracket name={"2"} ></Bracket>
                </BracketColumn>
                <BracketColumn round={"final"}>
                    <Bracket name={"Winner of Top Half"}></Bracket>
                </BracketColumn>
                <div className={"col-start-1 col-span-4 flex flex-col justify-center"}>
                    <h2 className={"text-3xl"}>Top Half</h2>
                    <span className={" border-2 border-dashed border-white relative h-1 w-full"}/>
                    <h2 className={"text-3xl"}>Bottom Half</h2>
                </div>

                <BracketColumn className="col-start-5" round={"winner"}>
                    <Bracket name={"Winner"} subtitle={"1st Place"}></Bracket>
                </BracketColumn>
                {/*Bottom Half*/}
                <BracketColumn round={"preliminary"}>
                    <Bracket name={seeds["2A"] || "Seed 2A"} subtitle={"2A"} color="#000"/>
                    <Bracket name={"BYE"} subtitle={"BYE"} color="#000"/>
                    <Bracket name={seeds["6A"] || "Seed 6A"} subtitle={"6A"} color="#000"/>
                    <Bracket name={seeds["3B"] || "Seed 3B"} subtitle={"3B"} color="#000"/>
                    <Bracket name={seeds["4A"] || "Seed 4A"} subtitle={"4A"} color="#000"/>
                    <Bracket name={seeds["5B"] || "Seed 5B"} subtitle={"5B"} color="#000"/>
                    <Bracket name={"BYE"} subtitle={"BYE"} color="#000"/>
                    <Bracket name={seeds["1B"] || "Seed 1B"} subtitle={"1B"} color="#000"/>
                </BracketColumn>
                <BracketColumn round={"quarter"}>
                    <Bracket name={"5"} color="#00FF00"></Bracket>
                    <Bracket name={"6"} color="#00FF00"></Bracket>
                    <Bracket name={"7"} color="#000"></Bracket>
                    <Bracket name={"8"} color="#000"></Bracket>
                </BracketColumn>
                <BracketColumn round={"semi"}>
                    <Bracket name={"7"} color="#000"></Bracket>
                    <Bracket name={"8"} color="#000"></Bracket>
                </BracketColumn>
                <BracketColumn round={"final"}>
                    <Bracket name={"Winner of Bottom Half"}></Bracket>
                </BracketColumn>
            </div>
            <h1 className={"text-5xl"}> 3rd Place</h1>
            <div className={"grid grid-cols-5"}>
                <BracketColumn className={"col-start-5"}>
                    <Bracket subtitle={"3rd Place Contender"} color="#000"/>
                    <Bracket subtitle={"3rd Place Contender"} color="#000"/>
                </BracketColumn>
                <BracketColumn>
                    <Bracket subtitle={"3rd Place"} color="#000"/>
                </BracketColumn>
            </div>

        </div>
    )
}