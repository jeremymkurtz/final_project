import React from 'react';
import RoundRobin from '../components/RoundRobin';
import { School } from '../../types/school';


export default function RoundRobinPage() {


    const [groupA, setGroupA] = React.useState<School[]>([]);
    const [groupB, setGroupB] = React.useState<School[]>([]);
    const fetchSchools = async () => {
        const response = await fetch('/schools', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const jsonData = await response.json();
        jsonData.forEach((school: School) => {
        if (school.pool === 'A') {
            setGroupA((prevGroupA) => [...prevGroupA, school]);
        } else if (school.pool === 'B') {
            setGroupB((prevGroupB) => [...prevGroupB, school]);
        }
});
    }





    return (
        <div>
            <RoundRobin poolA={groupA} poolB={groupB} />
        </div>
    );
};

