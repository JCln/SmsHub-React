import { Knob } from 'primereact/knob';
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export default function DashboardKnob({ maxNumber }: { maxNumber: string }) {
    let [counterValue, setCounterValue] = useState(0);

    ChartJS.register(ArcElement, Tooltip, Legend);
    const options = {
        aspectRatio: 2,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }
        },
        responsive: true,
        cutoutPercentage: '80%',
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        circumference: 300,
    }
    const data = {
        labels: [],
        datasets: [
            {
                data: [maxNumber, 1000],
                backgroundColor: [
                    'rgb(6 80 186)',
                    'rgb(234 245 254)',

                ],
                borderColor: [
                    'rgb(6 80 186)',
                    'rgb(234 245 254)',
                ],
                borderWidth: 1,
                cutout: '60%',
                rotation: 210,
                label: '',
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