import { Player } from './player.js';
export type School = {
    coach: string;
    name: string;
    abbr: string;
    players: Player[];
    points: number;
    pool: string;
    bracket: number; // 0 for preliminary, 1 for quarter, 2 for semi, 3 for finals
    seed: string;
}