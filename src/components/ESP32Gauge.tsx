import { Gauge } from '@ant-design/plots';
import React from 'react';
import {Spin} from "antd";

interface ESP32GaugeProps {
    name: string;
    target: number;
    color?: string;
    loading: boolean;
}
const ESP32Gauge : React.FC<ESP32GaugeProps> = ({name, target, color, loading}) => {
    const config = {
        loading: loading,
        width: 500,
        height: 400,
        autoFit: true,
        data: {
            target: target ? target : 0,
            total: 100,
            name: name,
        },
        legend: false,
        animate: {enter: { type: 'waveIn' }},
        title: name,
        titleColor: '#000',
        scale: {
            color: {
                range: [color || 'pink', 'gray'],
            },
        },
        marginBottom: 0,
        paddingBottom: 0,
         };
    return (
        <>
        {loading ? <Spin /> : <Gauge {...config} />}
        </>

    );
};

export default ESP32Gauge;