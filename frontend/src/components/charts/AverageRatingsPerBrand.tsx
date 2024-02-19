
import { useState, useEffect, useRef } from "react";
// import BarChart from "../BarChart";
import LineChart from "../LineChart";

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;


const AverageRatingsPerBrand = () => {

    const left_index = useRef(0);
    const right_index = useRef(50);

    const [ratings, setRatings] = useState<any>(null as any);
    const [, re_render] = useState<any>();

    let result_ratings: JSON[] = [];
    const total_length = useRef(100);

    useEffect(() => {

        axios({
            method: 'get',
            url: `${BACKEND_URL}/api/charts/get-average-ratings`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("res in charts24512: ", res.data.data)
            result_ratings = res.data.data;


            const DATA = {

                labels: result_ratings.map((data: any) => data.brand),
                datasets: [
                    {
                        label: "Average Ratings",

                        data: result_ratings.map((data: any) => data.average_ratings),

                        backgroundColor: [
                            "#FB9900"
                        ],

                        borderColor: "black",

                        borderWidth: 2,
                    },
                ],
            }

            // setRatings(DATA);
            total_length.current = result_ratings.length;
            setRatings(result_ratings)

        }).catch((err) => {
            console.log("err in charts233: ", err)
        })
    }, [])


    const options_ratings = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // This will hide the label at the top
            },
            title: {
                display: true,
                text: 'Average Ratings of Brands having ratings more than 100', // Optional: add if you want a title
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

            {/* <LineChart chartData={ratings} options={options_ratings} /> */}

            <div className="flex flex-col justify-start">

            
            <div className="">
                showing {left_index.current} to {right_index.current} of {total_length.current} entries
            </div>
            <div className="flex flex-col gap-10 justify-start">

                <div className="flex justify-center items-center gap-10 mt-4">
                    <button onClick={() => {
                        console.log("clicked left_index.current: ", left_index.current)
                        if (left_index.current - 50 >= 0) {
                            left_index.current -= 50;
                            right_index.current -= 50;
                            re_render({})
                        }
                    }} className="bg-gray-700 text-white px-4 py-2 rounded-md">Previous</button>
                    <button onClick={() => {
                        if (right_index.current < total_length.current) {
                            console.log("clicked right_index.current: ", right_index.current)
                            left_index.current += 50;
                            right_index.current += 50;
                            re_render({})
                        }
                    }} className="bg-gray-700 text-white px-4 py-2 rounded-md">Next</button>
                </div>

                <div className="overflow-auto h-[700px] lg:w-[900px]">
                    <table className="table-fixed w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-4 text-left bg-gray-700 text-white">Sr no.</th>
                                <th className="border border-gray-300 p-4 text-left bg-gray-700 text-white">Brand</th>
                                <th className="border border-gray-300 p-4 text-left bg-gray-200">Average Rating (Out of 5)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ratings != null ? ratings.map((data: any, index: number) => {
                                    return <>
                                    
                                    {index >= left_index.current && index <= right_index.current ? (
                                        <tr key={index} className="even:bg-gray-100 odd:bg-white">
                                            <td className="border border-gray-300 p-4 bg-gray-700 text-white">{index + 1}</td>
                                            <td className="border border-gray-300 p-4 bg-gray-700 text-white">{data.brand}</td>
                                            <td className="border border-gray-300 p-4 bg-gray-200">{data.average_rating.toFixed(2)}</td>
                                        </tr>
                                    ) : <></>}
                                    </>
                                }) : <></>
                            }
                        </tbody>
                    </table>

                </div>

            </div>
            </div>
        </>
    )
}

export default AverageRatingsPerBrand;
