import React, { useState } from 'react';
import { School } from '../../types/school';
import sanburg from '../assets/schools/sanburg.png';
import andrew from '../assets/schools/andrew.png';
import newtrier from '../assets/schools/newtrier.png';
import downersgrovenorth from '../assets/schools/downersgrovenorth.png';
import fremd from '../assets/schools/fremd.png';
import hinsdale from '../assets/schools/hinsdale.png';
import lockport from '../assets/schools/lockport.png';
import napervillenorth from '../assets/schools/napervillenorth.png';
import deerfield from '../assets/schools/deerfield.png';
import york from '../assets/schools/york.png';

export default function RoundRobin(props: { poolA: School[], poolB: School[] }) {
    const [selectedGroup, setSelectedGroup] = useState<number>(1); // Toggle between groups
    const pictures: { [key: string]: string } = {
        'SAN': sanburg,
        'AND': andrew,
        'NT': newtrier,
        'DGN': downersgrovenorth,
        'FR': fremd,
        'HS': hinsdale,
        'LT': lockport,
        'NN': napervillenorth,
        'DF': deerfield,
        'YK': york,
    };

    // Render function for each group
    const renderGroup = (group: School[]) => (
        <div className="mt-6 space-y-4">
            {/* Single Header Row */}
            <div className="grid grid-cols-3 items-center max-w-screen-lg mx-auto mb-4">
                <div className="flex justify-center text-3xl font-semibold">School</div>
                <div></div> {/* Empty space for alignment */}
                <div className="flex justify-center text-3xl font-semibold">Points</div>
            </div>

            {/* Team Rows */}
            {group.map((team, index) => (
                <div
                    key={index}
                    className="grid grid-cols-3 items-center max-w-screen-lg mx-auto py-4"
                >
                    {/* Team Logo */}
                    <div className="flex justify-center">
                        <img src={pictures[team.abbr]} alt={`${team.name} logo`} className="h-auto w-20" />
                    </div>

                    {/* Team Name */}
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-semibold">{team.name}</span>
                        <span className="text-black text-xl">({team.abbr})</span>
                    </div>

                    {/* Team Score */}
                    <div className="flex justify-center text-6xl font-bold">
                        {team.points}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-5xl font-bold text-center">Round Robin</h1>

            {/* Button Group to toggle between groups */}
            <div className="flex justify-center mt-4 space-x-4">
                <button
                    className={`px-4 py-2 font-semibold rounded transition-colors duration-200 ${
                        selectedGroup === 1 ? 'bg-[#214479] text-white' : 'border-solid border-2 border-[#214479] bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedGroup(1)}
                >
                    Group 1
                </button>
                <button
                    className={`px-4 py-2 font-semibold rounded transition-colors duration-200 ${
                        selectedGroup === 2 ? 'bg-[#1E6837] text-white' : 'border-solid border-2 border-[#1E6837] bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedGroup(2)}
                >
                    Group 2
                </button>
            </div>

            {/* Conditionally render Group 1 or Group 2 based on selectedGroup */}
            {selectedGroup === 1 ? renderGroup(props.poolA) : renderGroup(props.poolB)}
        </div>
    );
}