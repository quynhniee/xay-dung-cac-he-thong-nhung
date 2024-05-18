import React, {useEffect} from 'react';
import {Card, Flex} from "antd";
import ESP32Gauge from "./ESP32Gauge";
import {limitToLast, onValue, orderByKey, query, ref } from 'firebase/database';
import database from "../helpers/firebase-helper";

const ESP32Data = () => {
    const [temperature, setTemperature] = React.useState(30);
    const [humidity, setHumidity] = React.useState(40);
    const [loading, setLoading] = React.useState(false);

    async function getSensorData() {
        const sensorDataRef = query(ref(database, 'demo'), orderByKey(), limitToLast(1));
            setLoading(true);
        onValue(sensorDataRef, (snapshot) => {
            const data = snapshot.val();
            const lastKey = Object.keys(data)[0];
            const latestField = data[lastKey];
            console.log(latestField.temperature ? +latestField.temperature : 0)

            setTemperature(parseFloat(latestField.temperature));
            setHumidity(parseFloat(latestField.humidity))

            console.log(latestField);
            setLoading(false)
        });
    }

    useEffect(() => {
        getSensorData()
    }, []);

    return (
        <Card title="Dữ liệu từ ESP32" style={{flex: 1}}>
            <Flex >
                <Flex justify='center' vertical={false} align='center' flex={1}>
                    <ESP32Gauge target={temperature} name="Nhiệt độ" loading={loading}/>
                </Flex>
                <Flex justify='center' vertical={false} align='center' flex={1}>
                    <ESP32Gauge target={humidity} name="Độ ẩm" color='#4287f5' loading={loading}/>
                </Flex>
            </Flex>
        </Card>
    );
};

export default ESP32Data;
