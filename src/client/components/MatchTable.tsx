import React from 'react';

interface GameData {
    gameNumber: number;
    scoreA: string;
    scoreB: string;
}

interface Match {
    matchType: string;
    acronyms: string[];
    games: GameData[][];
}

const MatchTable: React.FC = () => {
    const matches: Match[] = [
        {
            matchType: 'Singles 1',
            acronyms: ['SAN1', 'FR2'],
            games: [
                [
                    { gameNumber: 1, scoreA: '21', scoreB: '15' },
                    { gameNumber: 2, scoreA: '21', scoreB: '12' },
                ],
                [
                    { gameNumber: 3, scoreA: '', scoreB: '' },
                ],
            ],
        },
        {
            matchType: 'Singles 2',
            acronyms: ['SAN5', 'FR1'],
            games: [
                [
                    { gameNumber: 1, scoreA: '18', scoreB: '21' },
                    { gameNumber: 2, scoreA: '16', scoreB: '21' },
                ],
                [
                    { gameNumber: 3, scoreA: '', scoreB: '' },
                ],
            ],
        },
        {
            matchType: 'Singles 3',
            acronyms: ['SAN3', 'FR7'],
            games: [
                [
                    { gameNumber: 1, scoreA: '21', scoreB: '18' },
                    { gameNumber: 2, scoreA: '22', scoreB: '24' },
                ],
                [
                    { gameNumber: 3, scoreA: '21', scoreB: '19' },
                ],
            ],
        },
    ];

    return (
        <div className="table-wrapper w-full border-[10px] border-black/12 rounded-[10px] border-collapse">
            <table className="w-full border-separate border-spacing-0">
                <thead>
                    <tr>
                        <th className="text-left py-1 border-b border-gray-300">Match</th>
                        <th className="text-left py-1 border-b border-gray-300">Acronym</th>
                        <th className="text-left py-1 border-b border-gray-300">Games</th>
                        <th className="text-left py-1 border-b border-gray-300">A</th>
                        <th className="text-left py-1 border-b border-gray-300">B</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td className="font-semibold border-b border-gray-300 py-1 text-[#1565c0]" rowSpan={4}>
                                    {match.matchType}
                                </td>

                                <td className="py-1" rowSpan={2}>
                                    {match.acronyms[0]}
                                </td>
                                <td className="py-1">
                                    {match.games[0][0].gameNumber}
                                </td>
                                <td className="py-1">{match.games[0][0].scoreA}</td>
                                <td className="py-1">{match.games[0][0].scoreB}</td>
                            </tr>
                            <tr>
                                <td className="py-1">
                                    {match.games[0][1].gameNumber}
                                </td>
                                <td className="py-1">{match.games[0][1].scoreA}</td>
                                <td className="py-1">{match.games[0][1].scoreB}</td>
                            </tr>

                            <tr>
                                <td className="border-b border-gray-300 py-1" rowSpan={2}>
                                    {match.acronyms[1]}
                                </td>
                                <td className="py-1">
                                    {match.games[1][0].gameNumber}
                                </td>
                                <td className="py-1">{match.games[1][0].scoreA}</td>
                                <td className="py-1">{match.games[1][0].scoreB}</td>
                            </tr>
                            <tr>
                                <td className="py-1 border-b border-gray-300"></td>
                                <td className="py-1 border-b border-gray-300"></td>
                                <td className="py-1 border-b border-gray-300"></td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatchTable;
