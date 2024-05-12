import { createChart, ColorType, LineStyle } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {

    const {
        data,
        baseLine,
        colors: {
            backgroundColor = '#111a27',
            lineColor = '#2962FF',
            textColor = 'white',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 450,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addBaselineSeries(
                {
                    baseValue: { type: 'price', price: baseLine },
                    topLineColor: 'rgba( 38, 166, 154, 1)',
                    topFillColor1: 'rgba( 38, 166, 154, 0.28)',
                    topFillColor2: 'rgba( 38, 166, 154, 0.05)',
                    bottomLineColor: 'rgba( 239, 83, 80, 1)',
                    bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
                    bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',

                });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor, baseLine]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};;