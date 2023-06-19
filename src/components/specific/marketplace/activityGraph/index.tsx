import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

import classes from './styles.module.css';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const colors = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'blue',
    'purple',
];

export const data = {
    labels,
    datasets: [
        {
            yAxesId: 'B',
            type: 'line' as const,
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: labels.map(() => Math.random() * 1000),
        },
        {
            yAxesId: 'A',
            type: 'bar' as const,
            label: 'Dataset 2',
            backgroundColor: 'rgb(75, 192, 192)',
            data: labels.map(() => Math.random() * 1000),
            borderColor: 'white',
            borderWidth: 2,
        },
    ],
};

const options = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis',
        },
    },
    scales: {
        yAxes: {
            grid: {
                drawBorder: true,
                color: '#FFFFFF',
            },
            ticks: {
                display: false,
            }
        },
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};

export default function ActivityGraph() {
    return (
        <div className={ classes.container }>
            <div className={ classes.headerContainer }>
                <h1 className={ classes.header }>Latest Activity</h1>

                <div className={ classes.headerContent }>
                    <div className={ classes.activityTimeline }></div>

                    <Chart
                        className={ classes.chart }
                        options={ options }
                        type="bar"
                        data={ data }
                    />
                </div>
            </div>

            <div className={ classes.history }></div>
        </div>
    );
}
