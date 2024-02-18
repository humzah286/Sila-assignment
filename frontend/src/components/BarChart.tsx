import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ChartOptions, ChartData, BarControllerChartOptions } from "chart.js/auto";


interface BarChartProps {
  chartData: ChartData<"bar", number[], unknown>;
  options?: ChartOptions<"bar"> & BarControllerChartOptions;
}

const BarChart: React.FC<BarChartProps> = ({ chartData, options }) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new ChartJS(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: options
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartData, options]);

  return <canvas ref={chartRef} />;
}

export default BarChart;



