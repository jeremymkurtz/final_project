import React, { useState } from 'react';
import closeIcon from '../assets/close-icon.png';
import logo from '../assets/logo.png';
import menuIcon from '../assets/menu-icon.png';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white py-5 px-2 flex justify-between items-center relative">
            <div className="text-white text-lg font-bold flex items-center gap-2">
                <a href="/">
                    <img src={logo} alt="Feathefest" />
                </a>
                <div className="hidden md:flex items-center space-x-4">
                    <h1 className="font-inter text-[24px] font-bold leading-normal">
                        <a href="/" className="inline-block">
                            <span className="text-[#214479]">Feather</span>
                            <span className="text-[#1E6837]">fest</span>
                        </a>
                    </h1>
                </div>

            </div>

            <div className="text-black text-lg font-semibold md:hidden">
                <h1 className="text-center font-inter text-[24px] font-bold leading-normal">
                    <a href="/" className="inline-block">
                        <span className="text-[#214479]">Feather</span>
                        <span className="text-[#1E6837]">fest</span>
                    </a>
                </h1>
            </div>

            <div className="text-white cursor-pointer md:hidden" onClick={toggleMenu}>
                <img src={isMenuOpen ? closeIcon : menuIcon} className="w-13" alt="menu icon" />
            </div>

            <nav className="hidden md:flex space-x-4">
                <a href="/" className="p-2 text-black hover:text-blue-600">
                    Home
                </a>
                <a href="/game-submission" className="p-2 text-black hover:text-blue-600">
                    Game Submission
                </a>
                <a href="/round-robin" className="p-2 text-black hover:text-blue-600">
                    Round Robin
                </a>
                <a href="/brackets" className="p-2 text-black hover:text-blue-600">
                    Brackets
                </a>
                <a href="/dashboard" className="p-2 text-black hover:text-blue-600">
                    Dashboard
                </a>
            </nav>

            {isMenuOpen && (
                <nav className="absolute top-[100px] right-0 w-full bg-white shadow-lg text-black flex flex-col items-center z-10 md:hidden">
                    <a href="/" className="p-2 hover:bg-blue-600 w-full text-center text-black">
                        Home
                    </a>
                    <a
                        href="/game-submission"
                        className="p-2 hover:bg-blue-600 w-full text-center text-black"
                    >
                        Game Submission
                    </a>
                    <a
                        href="/round-robin"
                        className="p-2 hover:bg-blue-600 w-full text-center text-black"
                    >
                        Round Robin
                    </a>
                    <a
                        href="/brackets"
                        className="p-2 hover:bg-blue-600 w-full text-center text-black"
                    >
                        Brackets
                    </a>
                </nav>
            )}
        </header>
    );
};

export default Header;