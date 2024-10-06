import { Player } from './player.js';
export type School = {
    coach: string;
    name: string;
    abbr: string;
    players: Player[];
    points: number;
    pool: string;
}