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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

export default function DashboardLineSend() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const data = {
        labels,
        datasets: [
            {
                label: 'پیام‌های ارسالی',
                data: labels.map(() => faker.commerce.price({ min: 2, max: 1000 })),
                borderColor: '#3F6EE5',
                backgroundColor: '#043477',
            }
        ],
    };
    return (
        <>
            <Line options={options} data={data} />
        </>
    )
}
