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
    ScriptableContext
} from 'chart.js';

import { Chart, ChartProps } from 'react-chartjs-2';

import ActivityCard from './activityCard';

import classes from './styles.module.css';
import React from 'react';
import api from '@/helpers/api';
import dayjs from 'dayjs';

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

export default function ActivityGraph(dataset: PreviewDataset) {
    const [rawActivityMetrics, setRawActivityMetrics] = React.useState<ActivityMetric[]>([]);

    React.useEffect(() => {
        async function fetch() {
            const result = (await api.get<Api.Response<ActivityMetric[]>>(`/api/datasets/${dataset._id}/activity`)).data.data;
            setRawActivityMetrics(result);
        }

        fetch().then();
    }, [dataset._id]);

    const xAxis = Array.from({ length: 28 }, (_, i) => {
        return dayjs().startOf('day').subtract(i, 'days');
    }).reverse();

    const labels = xAxis.map(day => {
        return day.format('DD/MM');
    });

    type HashmapType = Record<string, number>;

    const metricHashmap: Record<'view' | 'download', HashmapType> = {
        view: {},
        download: {},
    };
    for (const rawMetric of rawActivityMetrics) {
        const date = dayjs().startOf('day').toString();
        metricHashmap[rawMetric.type][date] = rawMetric.count;
    }

    const transformed = {
        view: xAxis.map((data) => {
            return metricHashmap.view[data.toString()] ?? 0;
        }),
        download: xAxis.map((data) => {
            return metricHashmap.download[data.toString()] ?? 0;
        }),
    };

    const data = function () {
        return {
            labels: labels,
            datasets: [
                {
                    yAxesId: 'y',
                    type: 'line' as const,
                    label: 'View count',
                    borderWidth: 2,
                    fill: false,
                    data: transformed.view,
                    borderColor: (context: ScriptableContext<'line'>) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        // This case happens on initial chart load
                        if (!chartArea) return;

                        const gradient = ctx.createLinearGradient(
                            0,
                            0,
                            chartArea.bottom,
                            chartArea.top
                        );

                        gradient.addColorStop(0, '#2BCDE4');
                        gradient.addColorStop(1, '#5D32E9');

                        return gradient;
                    },
                },
                {
                    yAxesId: 'y1',
                    type: 'line' as const,
                    label: 'Download count',
                    backgroundColor: 'white',
                    borderColor: 'white',
                    data: transformed.download,
                    barThickness: 5,
                    borderWidth: 0,
                    borderRadius: 10,
                },
            ],
        };
    };

    const options: ChartProps<'line' | 'bar'>['options'] = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            title: {
                display: true,
            },
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
                position: 'nearest' as const,
            },
        },
        scales: {
            yAxes: {
                grid: {
                    color: '#FFFFFF',
                },
                ticks: {
                    display: false,
                    color: '#D2E1FF',
                },
            },
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'Number of views',
                    color: '#D2E1FF',
                    font: {
                        size: 12,
                    },
                },
                max: Math.max(...transformed.download) || 50
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
                    text: 'Number of downloads',
                    color: '#D2E1FF',
                    font: {
                        size: 12,
                    },
                },
                max: Math.max(...transformed.view) || 50

            },
        },
        maintainAspectRatio: false,
    };

    const activity = [
        {
            dateAdded: new Date(),
            activityDesc: 'Added 10 images to XYZ dataset totalling 25 GB',
        },
        {
            dateAdded: new Date(),
            activityDesc: 'Added 10 images to XYZ dataset totalling 25 GB',
        },
        {
            dateAdded: new Date(),
            activityDesc: 'Added 10 images to XYZ dataset totalling 25 GB',
        },
        {
            dateAdded: new Date(),
            activityDesc: 'Added 10 images to XYZ dataset totalling 25 GB',
        },
    ];

    return (
        <div className={ classes.container }>
            <div className={ classes.headerContainer }>
                <div className={ classes.topHeaderContainer }>
                    <h1 className={ classes.header }>Latest Activity</h1>

                    <div></div>
                </div>

                <div className={ classes.headerContent }>
                    <div className={ classes.activityTimeline }>
                        {
                            activity.map((activity, i) => (
                                <ActivityCard
                                    key={ i }
                                    dateAdded={ activity.dateAdded }
                                    activityDesc={ activity.activityDesc }
                                />
                            ))
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
                <h1 className={ classes.header }>Activity History</h1>

                <div className={ classes.activityTableContainer }></div>
            </div>
        </div>
    );
}
