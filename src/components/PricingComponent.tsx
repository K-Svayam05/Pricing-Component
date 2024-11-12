"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const PricingComponent = () => {
    const [pageviews, setPageviews] = useState<number>(100);
    const [isYearly, setIsYearly] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [inputPageviews, setInputPageviews] = useState<string>("");

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(storedDarkMode);
    }, []);

    const getCurrentPrice = () => {
        let basePrice = 16; // default base price
        if (pageviews >= 10 && pageviews < 50) basePrice = 8;
        else if (pageviews >= 50 && pageviews < 100) basePrice = 12;
        else if (pageviews >= 100 && pageviews < 500) basePrice = 16;
        else if (pageviews >= 500 && pageviews < 1000) basePrice = 24;
        else if (pageviews >= 1000) basePrice = 36;

        return isYearly ? basePrice * 0.75 : basePrice;
    };

    const formatPageviews = (views: number) => {
        return views >= 1000 ? `${views / 1000}K` : `${views}K`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPageviews(e.target.value);
    };

    const applyCustomPageviews = () => {
        const customPageviews = parseInt(inputPageviews);
        if (!isNaN(customPageviews) && customPageviews >= 10) {
            setPageviews(customPageviews);
        }
    };

    return (
        <div className={`min-h-screen font-manrope transition-colors duration-300 ${isDarkMode ? 'bg-dark-desaturated-blue' : 'bg-very-pale-blue'
            }`}>
            <div className="absolute inset-0 bg-[url('/images/bg-pattern.svg')] bg-no-repeat bg-top opacity-50" />

            <button
                onClick={() => {
                    const newDarkMode = !isDarkMode;
                    setIsDarkMode(newDarkMode);
                    localStorage.setItem('darkMode', newDarkMode.toString());
                }}
                className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
                aria-label="Toggle dark mode"
            >
                {isDarkMode ? <Sun className="w-6 h-6 text-dark-grayish-blue" /> : <Moon className="w-6 h-6" />}
            </button>

            <div className="relative container mx-auto px-4 py-16">
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-dark-desaturated-blue dark:text-white mb-4">
                        Simple, traffic-based pricing
                    </h1>
                    <p className="text-dark-grayish-blue dark:text-dark-grayish-blue text-sm md:text-base">
                        Sign-up for our 30-day trial. No credit card required.
                    </p>

                </div>

                <div className={`max-w-2xl mx-auto rounded-lg shadow-xl p-6 md:p-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
                    }`}>
                    {/* Pricing Display */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <p className="text-grayish-blue dark:text-gray-300 uppercase tracking-wider text-sm mb-4 md:mb-0">
                            {formatPageviews(pageviews)} Pageviews
                        </p>
                        <div className="text-center md:text-right">
                            <span className="text-4xl font-extrabold text-light-desaturated-blue dark:text-gray-300">
                                ${getCurrentPrice().toFixed(2)}
                            </span>
                            <span className="text-grayish-blue dark:text-gray-300 ml-2">/ month</span>
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="mb-10">
                        <input
                            type="range"
                            min="10"
                            max="990"
                            step="10"
                            value={pageviews}
                            onChange={(e) => setPageviews(Number(e.target.value))}
                            className="w-full h-2 bg-soft-cyan rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, 
                  hsl(174, 86%, 45%) ${(pageviews / 1000) * 100}%, 
                  hsl(224, 65%, 95%) ${(pageviews / 1000) * 100}%)`
                            }}
                        />
                    </div>

                    {/* Custom Pageviews Input */}
                    <div className="flex items-center gap-2 mb-8">
                        <input
                            type="text"
                            value={inputPageviews}
                            onChange={handleInputChange}
                            placeholder="Enter pageviews"
                            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button
                            onClick={applyCustomPageviews}
                            className="px-4 py-2 bg-strong-cyan text-white rounded-lg hover:bg-opacity-90 transition-colors"
                        >
                            Set Pageviews
                        </button>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className="text-grayish-blue dark:text-gray-300 text-sm">Monthly Billing</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isYearly}
                                onChange={() => setIsYearly(!isYearly)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-strong-cyan rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                        </label>
                        <span className="text-grayish-blue dark:text-gray-300 text-sm">
                            Yearly Billing
                            <span className="ml-2 bg-light-grayish-red text-light-red text-xs font-medium px-2 py-0.5 rounded-full">
                                25% discount
                            </span>
                        </span>
                    </div>
                    <hr className="my-8" />

                    {/* Features */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <ul className="space-y-2 text-sm text-grayish-blue dark:text-gray-300">
                            <li className="flex items-center">
                                <img src="/images/icon-check.svg" alt="" className="mr-2" />
                                Unlimited websites
                            </li>
                            <li className="flex items-center">
                                <img src="/images/icon-check.svg" alt="" className="mr-2" />
                                100% data ownership
                            </li>
                            <li className="flex items-center">
                                <img src="/images/icon-check.svg" alt="" className="mr-2" />
                                Email reports
                            </li>
                        </ul>

                        <button className="px-12 py-3 bg-dark-desaturated-blue text-pale-blue rounded-full hover:bg-opacity-90 transition-colors">
                            Start my trial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingComponent;
