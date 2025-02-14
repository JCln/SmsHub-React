import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Chart,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

export default function DashboardLineReceive() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    Chart.defaults.font.family = 'Ravi';
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
                labels: {
                    // This more specific font property overrides the global property

                    font: {
                        size: 10,
                        family: 'Ravi'
                    }
                }
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    };

    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const data = {
        labels,
        datasets: [
            {
                label: 'پیام‌های دریافتی',
                data: labels.map(() => faker.commerce.price({ min: 2, max: 1000 })),
                borderColor: '#1da750',
                backgroundColor: '#1da750',
            },
        ],
    };
    return (
        <>
            <Line options={options} data={data} />
        </>
    )
}
