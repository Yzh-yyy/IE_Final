import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import Login from "../pages/Login";
import pierogi from "../assets/pierogi.png";
import Home from "../pages/Home";
import Info from "../pages/Info";
import BMICal from "../pages/BMI_calculator";
import Guideline from "../pages/Guideline";
import Journey from "../pages/Journey";
import Snake from "../pages/Snake";
import FallingFood from "../pages/FallingFood";
import Export from "../pages/Export";
import NotFound from "../pages/NotFound";
import Sketch from "../pages/Sketch";
import MemoryGame from "../pages/MemoryGame";
import "../pages/information.css";

export const RenderLayout = () => {
    const { user } = AuthData();
    const [showParentDropdown, setShowParentDropdown] = useState(false);
    const [showKidsDropdown, setShowKidsDropdown] = useState(false);
    const location = useLocation();

    const toggleParentDropdown = () => setShowParentDropdown(!showParentDropdown);
    const toggleKidsDropdown = () => setShowKidsDropdown(!showKidsDropdown);
    const closeDropdowns = () => {
        setShowParentDropdown(false);
        setShowKidsDropdown(false);
    };

    if (!user.isAuthenticated) {
        return <Login />;
    } else {
        return (
            <div className="flex flex-col min-h-screen">
                <nav
                    id="header"
                    className="fixed w-full z-30 top-0 text-white bg-gradient-to-r from-cyan-300 to-blue-900"
                >
                    <div className="mx-auto flex items-center justify-between py-1">
                        <div className="pl-4 flex items-center justify-center">
                            <img className="w-10 z-50" src={pierogi} alt="Pierogi" />
                            <Link
                                className="toggleColour text-black no-underline hover:text-white no-underline font-bold text-2xl lg:text-2xl ml-2"
                                to="/"
                            >
                                Health Journey
                            </Link>
                        </div>
                        <div className="block lg:hidden pr-4">
                            <button
                                id="nav-toggle"
                                className="flex items-center p-1 text-black-800 hover: text-black focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                            >
                                <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
                                    <title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>
                        <div
                            className="hidden lg:flex lg:items-center lg:w-auto flex-grow justify-center"
                            id="nav-content"
                        >
                            <ul className="list-reset flex justify-end flex -1">
                                {location.pathname !== "/" && (
                                    <li className="mr-3">
                                        <Link
                                            className="inline-block py-2 px-4 text-black font-bold no-underline"
                                            to="/"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                )}
                                <li className="mr-3 relative" onMouseLeave={closeDropdowns}>
                                    <button className="inline-block text-black text-lg no-underline hover:text-gray-800 hover:text-underline py-2 px-4 delay-3s" onClick={toggleParentDropdown}>
                                        For Parents {showParentDropdown ? '▲' : '▼'}
                                    </button>
                                    {showParentDropdown && (
                                        <div className="absolute dropdown-menu rounded shadow-lg py-2 mt-1">
                                            <Link to="/info/health-awareness" className="block px-4 py-2 text-black text-lg hover:bg-sky-300" onClick={closeDropdowns}>Health Awareness</Link>
                                            <Link to="/info/bmi-calculator" className="block px-4 py-2 text-black text-lg hover:bg-sky-300" onClick={closeDropdowns}>BMI Calculator</Link>
                                            <Link to="/info/healthy-guidelines" className="block px-4 py-2 text-black text-lg hover:bg-sky-300" onClick={closeDropdowns}>Healthy Guidelines (WIP)</Link>
                                        </div>
                                    )}
                                </li>
                                <li className="mr-3 relative" onMouseLeave={closeDropdowns}>
                                    <button className="inline-block text-black text-2xl no-underline hover:text-gray-800 hover:text-underline py-2 px-4 delay-3s" onClick={toggleKidsDropdown}>
                                        For Kids {showKidsDropdown ? '▲' : '▼'}
                                    </button>
                                    {showKidsDropdown && (
                                        <div className="absolute dropdown-menu rounded shadow-lg py-2 mt-1">
                                            <Link to="/Journey" className="block px-4 py-2 text-black text-lg hover:bg-sky-300" onClick={closeDropdowns}>Journey</Link>
                                            <Link to="/Snake" className="block px-4 py-2 text-black text-lg hover:bg-sky-300" onClick={closeDropdowns}>Snake</Link>
                                            <Link to="/FallingFood" className="block px-4 py-2 text-black text-lg hover:bg-sky-300" onClick={closeDropdowns}>FallingFood</Link>
                                            <Link to="/MemoryGame" className="block px-4 py-2 text-black text-lg hover:bg-sky-300" onClick={closeDropdowns}>MemoryGame</Link>
                                            <Link to="/Sketch" className="block px-4 py-2 text-black text-lg hover:bg-sky-300" onClick={closeDropdowns}>Sketch</Link>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/info" element={<Info />} />
                        <Route path="/info/health-awareness" element={<Info />} />
                        <Route path="/info/bmi-calculator" element={<BMICal />} />
                        <Route path="/info/healthy-guidelines" element={<Guideline />} />
                        <Route path="/Journey" element={<Journey />} />
                        <Route path="/Snake" element={<Snake />} />
                        <Route path="/FallingFood" element={<FallingFood />} />
                        <Route path="/Export" element={<Export />} />
                        <Route path="/MemoryGame" element={<MemoryGame />} />
                        <Route path="/Sketch" element={<Sketch />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>

                <footer className="bg-gradient-to-r from-cyan-300 to-blue-900">
                    <div className="mx-auto px-8 py-6 text-white text-center">
                        <p>&copy; 2024 Health Journey. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        );
    }
};
