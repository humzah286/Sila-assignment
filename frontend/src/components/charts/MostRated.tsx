
import { useState, useEffect } from "react";
import BarChart from "../BarChart";
// import LineChart from "../LineChart";

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;


const MostRated = () => {
    const [mostRated, setMostRated] = useState<any>(null as any);

    let result_most_rated: JSON[] = [];

    const Brands_list = []

    
    useEffect(() => {
        axios({
            method: 'get',
            url: `${BACKEND_URL}/api/charts/get-brands-with-most-ratings`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("res in charts: ", res)
            result_most_rated = res.data.data;

            result_most_rated = result_most_rated.filter((data: any) => {
                if (data.brand.trim() == "")
                return false;
                else return true
            })

            Brands_list.push(result_most_rated.map((data: any) => data.brand))
    
            const userDATA = {
    
                labels: result_most_rated.map((data: any) => data.brand),
                datasets: [
                    {
                        label: "Ratings recieved",
    
                        data: result_most_rated.map((data: any) => data.rated_products_count),
    
                        backgroundColor: [
                            "#FB9900"
                        ],
    
                        borderColor: "black",
    
                        borderWidth: 2,
                    },
                ],
            }
    
            setMostRated(userDATA);
    
        }).catch((err) => {
            console.log("err in charts: ", err)
        })
    }, [])

    
    const options_most_ratings_for_brands = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // This will hide the label at the top
            },
            title: {
                display: true,
                text: 'Number of Ratings recieved by brands from 1996 till 2015', // Optional: add if you want a title
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
                    text: 'Ratings recieved', // Label for the y-axis
                },
            },
        },
    };


    return (
        <>
            <BarChart chartData={mostRated} options={options_most_ratings_for_brands} />
        </>
    )
}

export default MostRated;