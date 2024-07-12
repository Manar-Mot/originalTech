import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface OrderStatusChartProps {
  pending: number;
  paid: number;
}

const OrderStatusChart: React.FC<OrderStatusChartProps> = ({ pending, paid }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy previous chart instance
      }
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Pending", "Paid"],
            datasets: [
              {
                label: "Order Status",
                data: [pending, paid],
                backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [pending, paid]);

  return <canvas ref={chartRef} />;
};

export default OrderStatusChart;
