import React from 'react';
import Banner from '../components/Banner';
import HeroSection from '../components/HeroSection';
import Aside from '../components/Aside';

export default function Home() {
    return (
        <div className={"flex gap-6 relative p-4"}>
            <Aside/>
            <div className='flex flex-col items-center justify-center w-5/6 wrapper'>
                <Banner />
                <HeroSection />
            </div>
        </div>
    );
};