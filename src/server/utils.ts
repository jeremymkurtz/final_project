import { Collection, InferIdType } from 'mongodb'
import { Player } from "../types/player.js";


// for this function, we need a collection of schools, where each school has:
// {
//     _id: ObjectId,
//     name: string, (optional, but could be useful)
//     abbr: string,
//     players: [ player1, player2, ... ]
// }
/**
 * Lookup a player from an abbreviation
 * - ex:
 * "AND1" -> "A. Villegas"
 * - AND = "Anderson", 1 = 1st player in the list
 * @param playerAbbr
 * @param schools
 * @returns the player object or null either if not found or if the player index is out of bounds
 */
export async function lookupPlayerFromAbbr( playerAbbr: string, schools: Collection ): Promise<Object | null> {
    // split the abbreviation into the school abbreviation and the player index
    const matchResult = playerAbbr.match(/[A-Z]+/);
    if (matchResult == null) {
        return null;    // invalid abbreviation
    }
    const schoolAbbr: string = matchResult[0];
    const playerIndex: number = parseInt(playerAbbr.slice(schoolAbbr.length));

    // find the school with the abbreviation
    const school = await schools.findOne({abbr: schoolAbbr});
    if (school == null) {
        return null;    // school not found
    }

    // get all players for the school
    const players: Player[] = school.players;

    if (playerIndex < 0 || players.length < playerIndex) {
        return null;    // player index out of bounds
    }

    // return the player object
    return players[playerIndex - 1];
}

/**
 * Finds the school that a player is in
 * @param playerName
 * @param schools
 * @returns the school object or null if not found
 */
export async function lookupSchoolFromPlayer( playerName: string, schools: Collection ) {
    const school = await schools.findOne({players: {$elemMatch: {name: playerName}}});
    if (school == null) {
        return null;    // school not found
    }

    return school;
}

