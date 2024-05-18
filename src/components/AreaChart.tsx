import React from 'react';
import { Area } from '@ant-design/plots';
import {Card} from "antd";

interface AreaChartProps {
    title: string;
    color?: string;
    loading: boolean;
    data?: any;
    type?: 'temperature' | 'humidity';
}
const AreaChart: React.FC<AreaChartProps> = ({color, title, loading, data, type}) => {
    const config = {
        loading: loading,
        data: !data ? [] :
        data.map((d: any, index: number) => {
            if (type === 'temperature') {
                return {temperature: d.temperature || -1, x: index};
            }
            return { humidity: d.humidity || -1, x: index};
        }),
        xField: 'x',
        yField: type,
        style: {
            fill: 'linear-gradient(-90deg, white 0%, ' + (color || 'pink') + ' 100%)',
        },
        axis: {
            y: { labelFormatter: '~s' },
        },
        line: {
            style: {
                stroke: (color || 'pink'),
                strokeWidth: 2,
            },
        },
        title: title,
        animate: { enter: { type: 'scaleInY' } }
        };
    return <Card style={{flex: 1}}>
        <Area {...config} />
    </Card>;
};

export default AreaChart;
