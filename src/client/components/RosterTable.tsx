function RosterTable() {
    const styleTable = "border-2 border-[rgb(33,68,121)] text-center w-fit py-1 px-4";
    const getPlayers = () => {
        const players = [];

        for(let i = 0; i <= 7; i++) {
            players[i] = (
                <tr className={i % 2 == 0 ? "bg-[rgb(222,235,255)]" : ""}>
                    <td className={styleTable}>ABC{i + 1}</td>
                    <td className={styleTable}>Player {i + 1}</td>
                </tr>
            )
        }

        return players;
    }

    return (
        <div className="flex justify-center">
            <div>
                <h1 className="text-4xl text-center">Welcome Coach!</h1><br/>
                <p className="text-center text-3xl">Your pool score is <span className="text-[rgb(33,68,121)] font-bold">0</span>.</p><br/>
                <table className="text-2xl">
                    <tr className="bg-[rgb(11,161,214)] text-white">
                        <th className={styleTable} colSpan="2">School Name</th>
                    </tr>
                    <tr className="bg-[rgb(112,146,196)] text-white">
                        <th className={styleTable}>Acronym</th>
                        <th className={styleTable}>Player Names</th>
                    </tr>
                    {getPlayers()}
                </table>
            </div>
        </div>
    );
}

export default RosterTable;