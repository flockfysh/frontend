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
    ScriptableContext,
    Tick
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

// TODO: need to specify type for the prop data
export default function Graph() {
    const labels = new Array(12 * 10).fill(0).map((_, i) => i + 1);

    const data = function () {
        return {
            labels,
            datasets: [
                {
                    yAxesId: 'y1',
                    type: 'line' as const,
                    label: 'Number of Files',
                    borderWidth: 2,
                    fill: false,
                    data: labels.map((_, i) => Math.log(i * 360)),
                    borderColor: (context: ScriptableContext<'line'>) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        // This case happens on initial chart load
                        if (!chartArea) return;

                        const gradient = ctx.createLinearGradient(
                            chartArea.left,
                            0,
                            chartArea.right,
                            0,
                        );

                        gradient.addColorStop(0, '#2BCDE4');
                        gradient.addColorStop(1, '#5D32E9');

                        return gradient;
                    },
                    pointStyle: false as const
                }
            ],
        };
    };

    const options = {
        responsive: true,
        interaction: {
            intersect: false,
        },
        stacked: false,
        plugins: {
            tooltip: {
                backgroundColor: '#1E1E1E',
                titleColor: '#D2E1FF',
                titleFont: {
                    weight: '700',
                    size: 16,
                },
                titleAlign: 'center' as const,
                bodyColor: '#D2E1FF',
                bodyAlign: 'center' as const,
                displayColors: false,
                caretSize: 0,
                borderColor: '#222327',
                borderWidth: 1,
                positions: 'nearest' as const,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#D2E1FF'
                },
                grid: {
                    display: false
                }
            },
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                grid: {
                    drawOnChartArea: true,
                    color: '#49535f'
                },
                title: {
                    display: true,
                    text: 'Number of Files',
                    color: '#D2E1FF',
                    font: {
                        size: 12,
                    },
                },
                ticks: {
                    display: true,
                    color: '#D2E1FF',
                    callback: function (tick: number | string, index: number, ticks: Tick[]) {
                        return Math.floor(tick as number)
                    },
                    padding: 20
                },
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <Chart
            className={ classes.chart }
            options={ options }
            type="bar"
            data={ data() }
        />
    );
}
