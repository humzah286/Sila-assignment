
import MostRated from "./charts/MostRated";
import RatingsPerYear from "./charts/RatingsPerYear";
import MostProducts from "./charts/MostProducts";
import AverageRatingsPerBrand from "./charts/AverageRatingsPerBrand";

const Charts = () => {

    return (
        <div className="flex justify-center md:justify-start mx-2 md:mx-0 lg:ml-40 mt-10 ">
            <div className="flex flex-col justify-center" style={{ fontFamily: "PTSans" }}>
                <h1 className="font-bold md:text-3xl mb-4">Amazon Data Analysis</h1>
                <p>
                    Following table below shows the Number of products in the Market by the top companies from the year 1996 till 2015
                </p>
                <div className="h-7"></div>
                <div className="w-[90vw] h-[200px] md:w-[500px] md:h-[300px]" style={{  }}>
                    <MostProducts />
                </div>

                <div className="h-16"></div>

                <p>
                    Following table below shows the ratings earned by top companies from the year 1996 till 2015
                </p>
                <div className="h-7"></div>
                <div className="w-[90vw] h-[200px] md:w-[500px] md:h-[300px]" >
                    <MostRated />
                </div>
                
                <div className="h-16"></div>
                
                <p>
                    Following table below shows the ratings earned by All the the Appliances from the year 2000 till 2018
                </p>
                <div className="h-7"></div>
                <div className="w-[90vw] h-[200px] md:w-[500px] md:h-[300px]" >
                    <RatingsPerYear />
                </div>

                <div className="h-16"></div>

                <p>
                    Following table below shows the ratings earned by All the the Appliances from the year 2000 till 2018
                </p>
                <div className="h-7"></div>
                <div className="w-screen lg:w-[1000px] flex justify-center" >
                    <AverageRatingsPerBrand />
                </div>

                <div className="h-16"></div>

            </div>
        </div>
    );
}

export default Charts;
