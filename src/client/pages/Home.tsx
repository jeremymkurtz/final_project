import React from 'react';
import Banner from '../components/Banner';
import HeroSection from '../components/HeroSection';
import Button from "../components/form/button";

export default function Home() {
    return (
        <div className={"flex flex-col gap-2 items-center justify-between"}>
            <Banner/>
            <Button className="bg-TrevBlue" navigateTo={"/game-submission"}>
                <p>Submission</p>
            </Button>
            <Button className="bg-TrevGreen" navigateTo={"/round-robin"}>
                <p>Round Robin</p>
            </Button>
            <Button className="bg-TrevGreen" navigateTo={"/brackets"}>
                <p>Bracket</p>
            </Button>
            <HeroSection/>
        </div>
    );
};