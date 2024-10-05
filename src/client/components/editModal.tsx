import React from "react";
import {Match} from "../../types/match";

export const openEditModal = async (event: React.MouseEvent<HTMLButtonElement>)=> {
  event.preventDefault();
  const editModalElement = document.getElementById('editModal');
  if (editModalElement) {
    editModalElement.style.display = 'block';
  }
  const docID = (event.target as HTMLButtonElement).id;

  const response = await fetch(`/getMatch?id=${docID}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  const changeButton = document.querySelector('button[name="changeButton"]') as HTMLInputElement;
  if (changeButton) {
    changeButton.id = docID;
  }
  const jsonData = await response.json();
  const input = {
    MatchType: document.querySelector('input[name="match-typeChange"]:checked') as HTMLInputElement,
    MatchFormat: document.querySelector('input[name="match-formatChange"]:checked') as HTMLInputElement,
    Match: document.getElementById('matchChange') as HTMLInputElement,
    SchoolA: document.getElementById("schoolAChange") as HTMLInputElement,
    SchoolB: document.getElementById("schoolBChange") as HTMLInputElement,
    PlayerA1: document.getElementById("playerA1Change") as HTMLInputElement,
    PlayerB1: document.getElementById("playerB1Change") as HTMLInputElement,
    PlayerA2: document.getElementById("playerA2Change") as HTMLInputElement,
    PlayerB2: document.getElementById("playerB2Change") as HTMLInputElement,
    Game1A: document.getElementById("game1AChange") as HTMLInputElement,
    Game1B: document.getElementById("game1BChange") as HTMLInputElement,
    Game2A: document.getElementById("game2AChange") as HTMLInputElement,
    Game2B: document.getElementById("game2BChange") as HTMLInputElement,
    Game3A: document.getElementById("game3AChange") as HTMLInputElement,
    Game3B: document.getElementById("game3BChange") as HTMLInputElement,
  };
  console.log(jsonData);
  (input.SchoolA as HTMLInputElement).value = jsonData.SchoolA;
  (input.SchoolB as HTMLInputElement).value = jsonData.SchoolB;
  (input.Match as HTMLInputElement).value = jsonData.Match;
  (input.PlayerA1 as HTMLInputElement).value = jsonData.PlayerA1;
  (input.PlayerB1 as HTMLInputElement).value = jsonData.PlayerB1;
  (input.PlayerA2 as HTMLInputElement).value = jsonData.PlayerA2;
  (input.PlayerB2 as HTMLInputElement).value = jsonData.PlayerB2;
  (input.Game1A as HTMLInputElement).value = jsonData.Game1A;
  (input.Game1B as HTMLInputElement).value = jsonData.Game1B;
  (input.Game2A as HTMLInputElement).value = jsonData.Game2A;
  (input.Game2B as HTMLInputElement).value = jsonData.Game2B;
  (input.Game3A as HTMLInputElement).value = jsonData.Game3A;
  (input.Game3B as HTMLInputElement).value = jsonData.Game3B;
  if (jsonData.MatchType === 'round-robin') {
    const roundRobinChange = document.getElementById('round-robinChange') as HTMLInputElement;
    if (roundRobinChange) {
      roundRobinChange.checked = true;
    }
  } else {
    const eliminationChange = document.getElementById('eliminationChange') as HTMLInputElement;
    if (eliminationChange) {
      eliminationChange.checked = true;
    }
  }
  if (jsonData.MatchFormat === 'singles') {
    const singlesChange = document.getElementById('singlesChange') as HTMLInputElement;
    if (singlesChange) {
      singlesChange.checked = true;
    }
  } else {
    const doublesChange = document.getElementById('doublesChange') as HTMLInputElement;
    if (doublesChange) {
      doublesChange.checked = true;
    }
  }
}

export default function editModal(setMatches:Function, matches: Match[]) {
  const editMatch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const input = {
      MatchType: document.querySelector('input[name="match-typeChange"]:checked') as HTMLInputElement,
      MatchFormat: document.querySelector('input[name="match-formatChange"]:checked') as HTMLInputElement,
      Match: document.getElementById('matchChange') as HTMLInputElement,
      SchoolA: document.getElementById("schoolAChange") as HTMLInputElement,
      SchoolB: document.getElementById("schoolBChange") as HTMLInputElement,
      PlayerA1: document.getElementById("playerA1Change") as HTMLInputElement,
      PlayerB1: document.getElementById("playerB1Change") as HTMLInputElement,
      PlayerA2: document.getElementById("playerA2Change") as HTMLInputElement,
      PlayerB2: document.getElementById("playerB2Change") as HTMLInputElement,
      Game1A: document.getElementById("game1AChange") as HTMLInputElement,
      Game1B: document.getElementById("game1BChange") as HTMLInputElement,
      Game2A: document.getElementById("game2AChange") as HTMLInputElement,
      Game2B: document.getElementById("game2BChange") as HTMLInputElement,
      Game3A: document.getElementById("game3AChange") as HTMLInputElement,
      Game3B: document.getElementById("game3BChange") as HTMLInputElement,
    };

    if (
        !input.MatchType ||
        !input.MatchFormat ||
        !input.Match ||
        !input.SchoolA ||
        !input.SchoolB ||
        !input.PlayerA1 ||
        !input.PlayerB1 ||
        input.Match.value === '' ||
        input.SchoolA.value === '' ||
        input.SchoolB.value === '' ||
        input.PlayerA1.value === '' ||
        input.PlayerB1.value === ''
    ) {
      alert('Please fill out all required fields');
      return;
    }

    const matchId = (event.target as HTMLButtonElement).id;
    console.log(matchId)
    const json = {
      MatchType: input.MatchType.value,
      MatchFormat: input.MatchFormat.value,
      Match: input.Match.value,
      SchoolA: input.SchoolA.value,
      SchoolB: input.SchoolB.value,
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
    };
    const body = JSON.stringify(json);



    const response = await fetch(`/update?id=${matchId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    const jsonData = await response.json();
    console.log(jsonData);

    const editModal = document.getElementById("editModal");
    if (editModal) {
      editModal.style.display = 'none';
    }
    console.log(jsonData)
    const updatedMatches = matches.map((match) => {
    if (match._id === matchId) {
      return jsonData;
    }
    return match;
  });

  setMatches(updatedMatches);
  };

  const closeEditModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const editModal = document.getElementById('editModal');
    if (editModal) {
      editModal.style.display = 'none';
    }
  }

  return (
    <div id="editModal" className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <form>
          <h2 className="is-size-4 is-flex is-justify-content-start is-align-items-start has-text-weight-semibold">
            Match Formatting:
          </h2>
          <div className="is-flex is-flex-direction-row is-justify-content-space-between ">
            <div className="is-flex is-flex-direction-column">
              <label className="pb-1" htmlFor="match-typeChange">Match Type:</label>
              <div className="flex-horizontal">
                <input type="radio" id="round-robinChange" name="match-typeChange" value="round-robin" required />
                <label htmlFor="round-robin">Round Robin</label>
              </div>
              <div className="is-flex is-flex-direction-row">
                <input type="radio" id="eliminationChange" name="match-typeChange" value="elimination" required />
                <label htmlFor="elimination">Elimination</label>
              </div>
            </div>

            <div className="is-flex is-flex-direction-column">
              <label className="pb-1" htmlFor="match-formatChange">Match Format:</label>
              <div className="is-flex is-flex-direction-row">
                <input type="radio" id="singlesChange" name="match-formatChange" value="singles" required />
                <label htmlFor="singles">Singles</label>
              </div>
              <div className="is-flex is-flex-direction-row">
                <input type="radio" id="doublesChange" name="match-formatChange" value="doubles" required />
                <label htmlFor="doubles">Doubles</label>
              </div>
            </div>

            <div className="is-flex is-justify-content-start is-flex-direction-column">
              <h4 className="pb-1">Match:</h4>
              <div className="select">
                <select id="matchChange" name="match" required>
                  <option value="">Choose Match Type</option>
                  <option value="Singles 1">Singles 1</option>
                  <option value="Singles 2">Singles 2</option>
                  <option value="Singles 3">Singles 3</option>
                  <option value="Singles 4">Singles 4</option>
                  <option value="Doubles 1">Doubles 1</option>
                  <option value="Doubles 2">Doubles 2</option>
                  <option value="Doubles 3">Doubles 3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <table>
              <tr>
                <td>
                  <h3 className="has-text-weight-semibold is-size-4 is-flex is-justify-content-start">Scores:</h3>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className="p-2">Schools</td>
                <td className="school-a">
                  <input className="input" list="schools" id="schoolAChange" name="schoolA" placeholder="Select School" required />
                </td>
                <td className="school-b">
                  <input className="input" list="schools" id="schoolBChange" name="schoolB" placeholder="Select School" required />
                </td>
              </tr>

              <tr>
                <td className="p-2">PLAYER 1</td>
                <td>
                  <input className="input" type="text" id="playerA1Change" name="playerA1" placeholder="NT1" required />
                </td>
                <td>
                  <input className="input" type="text" id="playerB1Change" name="playerB1" placeholder="AND2" required />
                </td>
              </tr>
              <tr>
                <td className="p-2">PLAYER 2</td>
                <td>
                  <input className="input" type="text" id="playerA2Change" name="playerA2" placeholder="NT2" />
                </td>
                <td>
                  <input className="input" type="text" id="playerB2Change" name="playerB2" placeholder="AND4" />
                </td>
              </tr>

              <tr>
                <td className="p-2">GAME 1</td>
                <td>
                  <input id="game1AChange" className="input" type="number" name="game1A" min={0} placeholder={"0"} required />
                </td>
                <td>
                  <input id="game1BChange" className="input" type="number" name="game1B" min={0} placeholder={"0"} required />
                </td>
              </tr>
              <tr>
                <td className="p-2">GAME 2</td>
                <td>
                  <input id="game2AChange" className="input" type="number" name="game2A" min={0} placeholder={"0"} required />
                </td>
                <td>
                  <input id="game2BChange" className="input" type="number" name="game2B" min={0} placeholder={"0"} required />
                </td>
              </tr>
              <tr>
                <td className="p-2">GAME 3</td>
                <td>
                  <input id="game3AChange" className="input" type="number" name="game3A" min={0} placeholder={"0"} />
                </td>
                <td>
                  <input id="game3BChange" className="input" type="number" name="game3B" min={0} placeholder={"0"} />
                </td>
              </tr>
            </table>
          </div>

          <div className="mt-2 submit-clear flex-horizontal is-justify-content-end is-align-items-end">
            <button type="button" name="changeButton" className="changeButton button is-link" value="Change" onClick={editMatch} > Change</button>
            <button type="button" className="cancel-modal ml-2 button is-link is-light" onClick={closeEditModal}>Cancel</button>
          </div>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={closeEditModal}></button>
    </div>
  );
}