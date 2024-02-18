
import { useState, useEffect } from "react";
// import BarChart from "../BarChart";
import LineChart from "../LineChart";

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;


const RatingsPerYear = () => {
    const [ratingsPerYear, setRatingsPerYear] = useState<any>(null as any);

    let result_ratings_per_year: JSON[] = [];

    useEffect(() => {
        
        axios({
            method: 'get',
            url: `${BACKEND_URL}/api/charts/get-total-reviews-per-year`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("res in charts245: ", res)
            result_ratings_per_year = res.data.data;

    
            const DATA = {
    
                labels: result_ratings_per_year.map((data: any) => data.rating_year),
                datasets: [
                    {
                        label: "Number of products",
    
                        data: result_ratings_per_year.map((data: any) => data.total_ratings),
    
                        backgroundColor: [
                            "#FB9900"
                        ],
    
                        borderColor: "black",
    
                        borderWidth: 2,
                    },
                ],
            }
    
            setRatingsPerYear(DATA);
    
        }).catch((err) => {
            console.log("err in charts233: ", err)
        })
    }, [])

    
    const options_ratings_per_year = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // This will hide the label at the top
            },
            title: {
                display: true,
                text: 'Number of Ratings recieved per year', // Optional: add if you want a title
            },
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: '', // Label for the x-axis
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Ratings', // Label for the y-axis
                },
            },
        },
    };



    return (
        <>
            <LineChart chartData={ratingsPerYear} options={options_ratings_per_year} />
        </>
    )
}

export default RatingsPerYear;
