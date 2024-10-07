import React from 'react';
import MatchTable from '../components/MatchTable';

const DashboardS: React.FC = () => {
  const matchesA = [
    {
      matchType: 'Singles 1',
      acronym: 'SAN1',
      games: [
        { gameNumber: 1, scoreA: '21', scoreB: '15' },
        { gameNumber: 2, scoreA: '21', scoreB: '12' },
        { gameNumber: 3, scoreA: '', scoreB: '' },
      ],
    },
    {
      matchType: 'Singles 2',
      acronym: 'SAN5',
      games: [
        { gameNumber: 1, scoreA: '18', scoreB: '21' },
        { gameNumber: 2, scoreA: '16', scoreB: '21' },
        { gameNumber: 3, scoreA: '', scoreB: '' },
      ],
    },
    {
      matchType: 'Singles 3',
      acronym: 'SAN3',
      games: [
        { gameNumber: 1, scoreA: '21', scoreB: '18' },
        { gameNumber: 2, scoreA: '22', scoreB: '24' },
        { gameNumber: 3, scoreA: '21', scoreB: '19' },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <MatchTable matches={matchesA} />
      <MatchTable matches={matchesA} />
    </div>
  );
};

export default DashboardS;
