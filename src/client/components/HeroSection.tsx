import React from 'react';
import {VideoTutorial} from './VideoTutorial';

const HeroSection: React.FC = () => {
    return (
        <div className="p-5 flex justify-center flex-col items-center">
            <h2 className="text-[#1E6837] text-center font-roboto text-[24px] font-bold mb-2">
                First Featherfest?
            </h2>
            <p className='mb-3'>Watch this Tutorial about how the tournament will play out:</p>
            <VideoTutorial src={"https://www.youtube.com/embed/UyLIi-TbcFc?si=r8aDawI_82_npeO8"}/>

        </div>
    );
};

export default HeroSection;