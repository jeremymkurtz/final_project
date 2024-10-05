import { openEditModal } from "./editModal";
import { Match} from "../../types/match";
import React, {useEffect} from "react";
export function MatchComponent({data, deleteMatch}: {data: Match, deleteMatch: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
  return (
      <div className="fixed-grid">
        <div className="grid">
          <div className="cell match-info is-col-span-3 is-inline is-size-5">
            <p className="is-inline is-size-4">{data.SchoolA} -</p>
            <p className="is-inline is-size-4">{data.SchoolB} -</p>
            <p className="is-inline is-size-4"> {data.MatchType} -</p>
            <p className="is-inline is-size-4"> {data.MatchFormat}</p>
          </div>
          <div className="cell is-col-start-1">
            <div>
              <p className="is-inline-block">{data.SchoolA}</p>
              {data.winner === data.SchoolA ? <p className="is-inline-block">✔</p> : ''}
            </div>
            <div>
              <p className="is-inline">{data.PlayerA1}</p>
              {data.PlayerA2 === '' ? '' : <p className="is-inline-block"> / {data.PlayerA2} + </p>}
            </div>
          </div>
          <div className="cell columns is-gapless is-flex ">
            <p className="column is-size-3">{data.Game1A}</p>
            <p className="column is-size-3">{data.Game2A}</p>
            {data.Game3A === '0' && data.Game3B === '0' ? '' : <h3 className="column is-size-3"> {data.Game3A} </h3>}
          </div>
          <button id={data._id} name="edit" className="cell is-1-one-fifth button is-warning" onClick={openEditModal}>Edit</button>
          <div className="cell is-col-start-1">
            <div>
              <p className="is-inline-block">{data.SchoolB}</p>
              {data.winner === data.SchoolB ? <p className="is-inline-block">✔</p> : ''}
            </div>
            <div>
              <p className="is-inline">{data.PlayerB1}</p>
              {data.PlayerB2 === '' ? '' : <p className="is-inline-block"> {data.PlayerB2} </p>}
            </div>
          </div>
          <div className="cell columns is-gapless is-flex is-justify-content-space-between">
            <h3 className="column is-size-3">{data.Game1B}</h3>
            <h3 className="column is-size-3">{data.Game2B}</h3>
            {data.Game3A === '0' && data.Game3B === '0' ? '' : <h3 className="column is-size-3">{ data.Game3B} </h3>}
          </div>
          <button id={data._id} name="delete" className="cell is-1-one-fifth button is-danger" onClick={deleteMatch}>Delete</button>
        </div>
      </div>
  );
}

export default function MatchesContainer(setMatches: Function, matches: Match[]) {
  const fetchMatches = async () => {
    const response = await fetch("/userMatches", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json();
    setMatches(jsonData); // Set the matches from the server
  };

  const deleteMatch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const matchId = (event.target as HTMLButtonElement).id;
    const body = JSON.stringify({ _id: matchId });

    const response = await fetch("/remove", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const result = await response.json();
    console.log(result);

    // After deletion, re-fetch or filter the state to update the UI
    setMatches(matches.filter((match) => match._id !== matchId));
  };

  useEffect(() => {
    fetchMatches(); // Fetch matches when the component mounts
  }, []);

  return (
      <div id="matches-container">
        {matches.map((matchData) => (
            <MatchComponent key={matchData._id} data={matchData} deleteMatch={deleteMatch} />
        ))}
      </div>
  );
}