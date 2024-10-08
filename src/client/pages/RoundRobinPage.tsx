import React, { useEffect } from 'react';
import RoundRobin from '../components/RoundRobin';
import { School } from '../../types/school';

export default function RoundRobinPage() {
    const [groupA, setGroupA] = React.useState<School[]>([]);
    const [groupB, setGroupB] = React.useState<School[]>([]);

    const fetchSchools = async () => {
        const response = await fetch('/schools', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        const jsonData = await response.json();
        const tempGroupA: School[] = [];
        const tempGroupB: School[] = [];

        jsonData.forEach((school: School) => {
            if (school.pool === 'A') {
                tempGroupA.push(school);
            } else if (school.pool === 'B') {
                tempGroupB.push(school);
            }
        });
        setGroupA(tempGroupA);
        setGroupB(tempGroupB);
    };

    useEffect(() => {
        fetchSchools();
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            <RoundRobin poolA={groupA} poolB={groupB} />
        </div>
    );
}