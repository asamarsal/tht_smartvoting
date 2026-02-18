import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface ApexChartProps {
  type:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
  series: any[];
  options: any;
  height?: number | string;
}

export default function ApexChart({
  type,
  series,
  options,
  height = 350,
}: ApexChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Initialize chart
      const chartOptions = {
        ...options,
        chart: {
          ...options.chart,
          type: type,
          height: height,
        },
        series: series,
      };

      chartInstance.current = new ApexCharts(chartRef.current, chartOptions);
      chartInstance.current.render();

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }
  }, [type, height]); // Re-create if type/height changes

  useEffect(() => {
    // Update data if chart exists
    if (chartInstance.current) {
      chartInstance.current.updateOptions({ ...options, series });
    }
  }, [series, options]);

  return <div ref={chartRef} />;
}
