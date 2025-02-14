import { Knob } from 'primereact/knob';
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export default function DashboardKnob({ maxNumber }: { maxNumber: string }) {
    let [counterValue, setCounterValue] = useState(0);

    ChartJS.register(ArcElement, Tooltip, Legend);
    const options = {
        aspectRatio: 6,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }
        },
        responsive: true,
        cutoutPercentage: 100,
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    }
    const data = {
        labels: [],
        datasets: [
            {
                label: '',
                data: [maxNumber],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Doughnut options={options} data={data} />
        </>
        /* <Knob value={counterValue} readOnly /> */
    )
}