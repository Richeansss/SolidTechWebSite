import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    labels: string[];
    data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ labels, data }) => {
    const chartRef = useRef<ChartJS<"bar", number[], string> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const ctx = chart.ctx;
            if (!ctx) return;

            // Создаем градиент для столбцов
            const barGradient = ctx.createLinearGradient(0, 0, 0, 600);
            barGradient.addColorStop(0, 'rgba(52, 152, 219, 1)'); // Голубой
            barGradient.addColorStop(1, 'rgba(44, 62, 80, 1)'); // Темно-серый

            // Устанавливаем градиентный цвет
            chart.data.datasets[0].backgroundColor = barGradient;
            chart.update();
        }
    }, [data, labels]);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Значения',
                data: data,
                backgroundColor: 'rgba(52, 152, 219, 1)', // Временный цвет (заменится)
                borderColor: 'rgba(44, 62, 80, 1)',
                borderWidth: 2,
                borderRadius: 8, // Закругленные края столбцов
                hoverBackgroundColor: 'rgba(41, 128, 185, 1)', // Ярче при наведении
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#ecf0f1', // Светлый цвет легенды
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: 'Стильная столбчатая диаграмма',
                color: '#ecf0f1',
                font: {
                    size: 18,
                    weight: "bold" as const
                },
            },
            tooltip: {
                backgroundColor: 'rgba(44, 62, 80, 0.8)', // Темный фон подсказок
                titleColor: '#ecf0f1',
                bodyColor: '#ecf0f1',
                borderColor: '#ecf0f1',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#ecf0f1', // Цвет подписей оси X
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
            y: {
                ticks: {
                    color: '#ecf0f1', // Цвет подписей оси Y
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
        },
    };

    return (
        <div
            style={{
                background: 'linear-gradient(180deg, #2c3e50, #34495e)',
                padding: 30,
                borderRadius: 15,
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                margin: 'auto',
            }}
        >
            <Bar ref={chartRef} data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
