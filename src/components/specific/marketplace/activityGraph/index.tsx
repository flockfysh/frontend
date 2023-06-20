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
    ChartArea
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

import ActivityCard from './activityCard';

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

const labels = new Array(24).fill(2).map((_, i) => i + 1);

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

export const data = function() {
    return {
        labels,
        datasets: [
            {
                yAxesId: 'y',
                type: 'line' as const,
                label: 'Dataset 1',
                borderWidth: 2,
                fill: false,
                data: labels.map(() => Math.random() * 1000),
                borderColor: (context: ScriptableContext<'line'>) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    // This case happens on initial chart load
                    if (!chartArea) return;

                    const gradient = ctx.createLinearGradient(0, 0, chartArea.bottom, chartArea.top);
                    
                    gradient.addColorStop(0, '#2BCDE4');
                    gradient.addColorStop(1, '#5D32E9');
                    
                    return gradient;
                }
            },
            {
                yAxesId: 'y1',
                type: 'bar' as const,
                label: 'Dataset 2',
                backgroundColor: 'white',
                borderColor: 'white',
                data: labels.map(() => Math.random() * 1000),
                barThickness: 5,
                borderWidth: 0,
                borderRadius: 10
            },
        ],
    }
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
                color: '#D2E1FF',
            },
            labelString: 'sad'
        },
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            title: {
                display: true,
                text: 'Number of Files',
                color: '#D2E1FF',
                font: {
                    size: 12
                }
            }
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            },
            title: {
                display: true,
                text: 'Number of Datasets',
                color: '#D2E1FF',
                font: {
                    size: 12
                }
            }
        }
    }
};

const activity = [
    {
        dateAdded: new Date(),
        activityDesc: 'Added 10 images to XYZ dataset totalling 25 GB'
    },
    {
        dateAdded: new Date(),
        activityDesc: 'Added 10 images to XYZ dataset totalling 25 GB'
    },
    {
        dateAdded: new Date(),
        activityDesc: 'Added 10 images to XYZ dataset totalling 25 GB'
    },
    {
        dateAdded: new Date(),
        activityDesc: 'Added 10 images to XYZ dataset totalling 25 GB'
    }
];

export default function ActivityGraph() {
    return (
        <div className={ classes.container }>
            <div className={ classes.headerContainer }>
                <h1 className={ classes.header }>Latest Activity</h1>

                <div className={ classes.headerContent }>
                    <div className={ classes.activityTimeline }>
                        {
                            activity.map(
                                (activity, i) => (
                                    <ActivityCard
                                        key={ i }
                                        dateAdded={ activity.dateAdded }
                                        activityDesc={ activity.activityDesc }
                                    />
                                )
                            )
                        }
                    </div>

                    <div className={ classes.chartContainer }>
                        <Chart
                            className={ classes.chart }
                            options={ options }
                            type="bar"
                            data={ data() }
                        />
                    </div>
                </div>
            </div>

            <div className={ classes.history }>
                
            </div>
        </div>
    );
}
