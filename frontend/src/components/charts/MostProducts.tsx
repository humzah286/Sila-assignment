
import { useState, useEffect } from "react";
import BarChart from "../BarChart";
// import LineChart from "../LineChart";

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;


const MostProducts = () => {
    
    const [mostProducts, setMostProducts] = useState<any>(null as any);
    
    let result_most_products: JSON[] = [];
    
    useEffect(() => {

        axios({
            method: 'get',
            url: `${BACKEND_URL}/api/charts/get-brands-with-most-products`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("res in charts2: ", res)
            result_most_products = res.data.data;

            result_most_products = result_most_products.filter((data: any) => {
                if (data.brand.trim() == "")
                return false;
                else return true
            })
    
            const DATA = {
    
                labels: result_most_products.map((data: any) => data.brand),
                datasets: [
                    {
                        label: "Number of products",
    
                        data: result_most_products.map((data: any) => data.product_count),
    
                        backgroundColor: [
                            "#FB9900"
                        ],
    
                        borderColor: "black",
    
                        borderWidth: 2,
                    },
                ],
            }

            setMostProducts(DATA);
    
        }).catch((err) => {
            console.log("err in charts233: ", err)
        })

    }, [])

    const options_most_products_for_brands = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // This will hide the label at the top
            },
            title: {
                display: true,
                text: 'Number of Products by brands from 1996 till 2015', // Optional: add if you want a title
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
                    text: 'Products in market', // Label for the y-axis
                },
            },
        },
    };

    return (
        <>
            <BarChart chartData={mostProducts} options={options_most_products_for_brands} />
        </>
    )
}

export default MostProducts;
