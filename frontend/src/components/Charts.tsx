
import { useState, useEffect } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

import MostRated from "./charts/MostRated";
import RatingsPerYear from "./charts/RatingsPerYear";
import MostProducts from "./charts/MostProducts";

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;


const Charts = () => {

    return (
        <div className="flex justify-center md:justify-start lg:ml-40 mt-10 ">
            <div className="flex flex-col justify-center" style={{ fontFamily: "PTSans" }}>
                <h1 className="font-bold md:text-3xl mb-4">Amazon Data Analysis</h1>
                <p>
                    Following table below shows the Number of products in the Market by the top companies from the year 1996 till 2015
                </p>
                <div className="h-7"></div>
                <div style={{ width: 500, height: 300 }}>
                    <MostProducts />
                </div>

                <div className="h-16"></div>

                <p>
                    Following table below shows the ratings earned by top companies from the year 1996 till 2015
                </p>
                <div className="h-7"></div>
                <div style={{ width: 500, height: 300 }}>
                    <MostRated />
                </div>
                
                <div className="h-16"></div>
                
                <p>
                    Following table below shows the ratings earned by All the the Appliances from the year 2000 till 2018
                </p>
                <div className="h-7"></div>
                <div className="w-screen flex justify-center" style={{ width: 800, height: 300 }}>
                    <RatingsPerYear />
                </div>
            </div>
        </div>
    );
}

export default Charts;