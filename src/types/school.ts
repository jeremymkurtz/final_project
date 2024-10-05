import { Player } from './player.js';
export type School = {
    name: string;
    abbr: string;
    players: Player[];
    points: number;
    pool: string;
}