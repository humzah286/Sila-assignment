
import MostRated from "./charts/MostRated";
import RatingsPerYear from "./charts/RatingsPerYear";
import MostProducts from "./charts/MostProducts";
import AverageRatingsPerBrand from "./charts/AverageRatingsPerBrand";

import EditDataset from "./EditDataset";

const Charts = () => {

    return (
        <div className="flex justify-center md:justify-start lg:ml-40 lg:mr-40 mt-10 ">
            <div className="flex flex-col justify-center px-2" style={{ fontFamily: "PTSans" }}>
                <h1 className="font-bold md:text-3xl mb-4 px-2">Amazon Data Analysis</h1>
                <p className="px-2 text-justify">Following is the analysis performed on Amazon Dataset of 2018 with Records dating from 1996, This Dataset was quite extensive and in this project, Analysis is performed only on Appliances past of Dataset, with more than 0.6 million records</p>
                <h2 className="font-bold md:text-2xl my-4 px-2">
                    Product Analysis
                </h2>
                <p className="px-2">
                    Following table below shows the Number of products in the Market by the top companies from the year 1996 till 2015
                </p>
                <div className="h-7"></div>
                <div className="w-[90vw] h-[300px] md:w-[700px] md:h-[400px] px-2" >
                    <MostProducts />
                </div>

                <div className="h-16"></div>

                <h2 className="font-bold md:text-2xl my-4 px-2">
                    Rating Analysis
                </h2>

                <p className="px-2">
                    Following table below shows the ratings earned by top companies from the year 1996 till 2015
                </p>
                <div className="h-7"></div>
                <div className="w-[90vw] h-[300px] md:w-[700px] md:h-[400px] px-2" >
                    <MostRated />
                </div>
                
                <div className="h-16"></div>

                <h2 className="font-bold md:text-2xl my-4 px-2">
                    Ratings recieved per year
                </h2>
                
                <p className="px-2">
                    Following table below shows the average ratings earned by All the the Appliances from the year 2000 till 2018
                </p>
                <div className="h-7"></div>
                <div className="w-[90vw] h-[300px] md:w-[700px] md:h-[400px] px-2" >
                    <RatingsPerYear />
                </div>

                <div className="h-16"></div>

                <h2 className="font-bold md:text-2xl my-4 px-2">
                    Average Ratings of Brands
                </h2>

                <p className="px-2">
                    Following table below shows the ratings earned by All the the Appliances from the year 2000 till 2018
                </p>
                <div className="h-7"></div>
                <div className="w-screen lg:w-[1000px] flex justify-center md:justify-start px-2" >
                    <AverageRatingsPerBrand />
                </div>

                <div className="h-16"></div>

                <EditDataset />

            </div>
        </div>
    );
}

export default Charts;
