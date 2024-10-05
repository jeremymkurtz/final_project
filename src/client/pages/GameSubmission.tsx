import React from 'react';
import robinLogo from "../assets/robin.png";
import bracketsLogo from "../assets/trophy.png";

const GameSubmisssion: React.FC = () => {

    return (
        <section>
            <div className="container">
                <h2 className="text-black text-center font-inter text-[32px] font-bold leading-normal mb-3">
                    Game Submission
                </h2>
                <form className='text-left'>
                    <div className='text-left mb-2'>
                        <label className="font-bold font-inter text-[24px] block mb-2 ">Type:</label>
                        <div className="space-y-2">
                            <div className='flex gap-2 items-center'>
                                <input
                                    type="radio"
                                    id="round-robin"
                                    name="gameType"
                                    value="Round Robin"
                                />
                                <img src={robinLogo} alt="robin logo" className='w-5' />
                                <label htmlFor="round-robin">Round Robin</label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input
                                    type="radio"
                                    id="brackets"
                                    name="gameType"
                                    value="Brackets"
                                />
                                <img src={bracketsLogo} alt="brackets logo" className='w-5' />
                                <label htmlFor="brackets">Brackets</label>
                            </div>
                        </div>
                    </div>

                    <div className='mb-2'>
                        <label className="block text-lg font-semibold mb-2">Match:</label>
                        <select
                            className="w-full border rounded p-2 text-gray-500"
                        >
                            <option value="" disabled selected>Choose Match Type</option>
                            <option value="Match 1">Match 1</option>
                            <option value="Match 2">Match 2</option>
                        </select>
                    </div>

                    <div className='mb-5'>
                        <label className="block text-lg font-semibold mb-2">Scores:</label>
                        <div className="grid custom-grid gap-0">
                            <div></div>
                            <div className="text-center font-semibold p-3 bg-[#C9DAF8] text-[#A1B0CF]">School A</div>
                            <div className="text-center font-semibold p-3 bg-[#D9EAD3] text-[#A1B0CF]">School B</div>
                            {['Game1', 'Game2', 'Game3'].map((round, index) => (
                                <React.Fragment key={index}>
                                    <div
                                        style={{
                                            writingMode: 'vertical-lr',
                                            textOrientation: 'upright',
                                            whiteSpace: 'nowrap',
                                            backgroundColor: '#C9DAF8'
                                        }}
                                         className="flex items-center justify-center h-full md:h-auto"
                                    >
                                        <p className="text-[#A1B0CF] text-center font-inter text-[15px] font-medium leading-[18px] uppercase">
                                            {round}
                                        </p>

                                    </div>
                                    <input
                                        type="number"
                                        className="border rounded p-3 text-center text-black font-inter text-[64px] font-semibold leading-[24px] placeholder-black"
                                        placeholder="0"
                                    />

                                    <input
                                        type="number"
                                        className="border rounded p-3 text-center text-black font-inter text-[64px] font-semibold leading-[24px] placeholder-black"
                                        placeholder="0"
                                    />

                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-6 justify-center">
                        <button
                            type="submit"
                            className="bg-[#214479] text-white px-4 py-2 rounded-[10px] hover:bg-blue-700"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="bg-white text-black border border-solid border-[#214479] rounded-[10px] px-4 py-2 hover:bg-gray-400"
                        >
                            Clear
                        </button>

                    </div>
                </form>
            </div>
        </section>
    );
};

export default GameSubmisssion;
