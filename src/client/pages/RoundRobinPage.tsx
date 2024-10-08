import React from 'react';
import RoundRobin from '../components/RoundRobin';

const group1 = [
    { name: 'Sanburg', short: 'SAN', points: 0, logo: '/src/client/assets/sanburg.png' },
    { name: 'Andrew', short: 'AND', points: 2, logo: '/src/client/assets/andrew.png' },
    { name: 'New Trier', short: 'NT', points: 3, logo: '/src/client/assets/newtrier.png' },
    { name: 'Downers Grove North', short: 'DGN', points: 4, logo: '/src/client/assets/downersgrovenorth.png' },
    { name: 'Fremd', short: 'FR', points: 5, logo: '/src/client/assets/fremd.png' },
];

const group2 = [
    { name: 'Hinsdale South', short: 'HS', points: 3, logo: '/src/client/assets/hinsdale.png' },
    { name: 'Lockport', short: 'LT', points: 1, logo: '/src/client/assets/lockport.png' },
    { name: 'Naperville North', short: 'NN', points: 5, logo: '/src/client/assets/napervillenorth.png' },
    { name: 'Deerfield', short: 'DF', points: 2, logo: '/src/client/assets/deerfield.png' },
    { name: 'York', short: 'YK', points: 4, logo: '/src/client/assets/york.png' },
];

const RoundRobinPage: React.FC = () => {
    return (
        <div>
            <RoundRobin group1={group1} group2={group2} />
        </div>
    );
};

export default RoundRobinPage;
