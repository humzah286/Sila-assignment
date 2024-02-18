import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js/auto';

interface LineChartProps {
  chartData: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

const LineChart: React.FC<LineChartProps> = ({ chartData, options }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new ChartJS(chartRef.current, {
        type: 'line',
        data: chartData,
        options: options
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartData, options]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
