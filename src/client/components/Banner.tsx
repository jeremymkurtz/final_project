import React from 'react';
import banner from "../assets/featherfest.png";

const Banner: React.FC = () => {
    return (<img src={banner} alt="banner" className="w-full object-contain h-auto max-h-[300px]" />
    );
};

export default Banner;