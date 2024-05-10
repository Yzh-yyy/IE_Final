import React from 'react';
import { Bar } from 'react-chartjs-2';
import consumption from "./data/daily_consumption.json"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement
);

const images = [
    'url-to-image-for-grains.jpg', // Replace with actual image path
    'url-to-image-for-vegetables.jpg',
    'url-to-image-for-fruit.jpg',
    'url-to-image-for-dairy.jpg',
    'url-to-image-for-meats.jpg'
];

const DailyConsumption = () => {
    const foodGroups = consumption.map(item => item.Food_group);
    const dataYears = ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23'];

    const yearColors = {
        '2018-19': '#003f5c',
        '2019-20': '#58508d',
        '2020-21': '#bc5090',
        '2021-22': '#ff6361',
        '2022-23': '#ffa600'
    };

    const datasets = dataYears.map(year => ({
        label: year,
        data: consumption.map(item => item[year.trim()]),
        backgroundColor: yearColors[year]
    }));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Consumption of Food Groups Over Years',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ": " + tooltipItem.raw;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 6
            }
        }
    };

    // Define a plugin to draw images on the canvas
    const imagePlugin = {
        id: 'imagesOnChart',
        afterDatasetsDraw: function(chart) {
            const ctx = chart.ctx;
            chart.data.datasets.forEach((dataset, i) => {
                chart.getDatasetMeta(i).data.forEach((point, index) => {
                    if (i === 0) { // Only draw on the first dataset
                        const image = new Image();
                        image.src = images[index];
                        const x = point.x - 12; // Adjust image position as needed
                        const y = point.y - 24;
                        ctx.drawImage(image, x, y, 24, 24); // Adjust image size as needed
                    }
                });
            });
        }
    };

    const chartData = {
        labels: foodGroups,
        datasets
    };

    return <Bar options={options} plugins={[imagePlugin]} data={chartData} />;
};

export default DailyConsumption;
