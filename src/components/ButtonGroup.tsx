import React, {useEffect} from 'react';
import {Card, Flex, Typography} from "antd";
import {PoweroffOutlined} from "@ant-design/icons";
import Button from "antd/es/button";
import {onValue, ref, set } from 'firebase/database';
import database from "../helpers/firebase-helper";


const ButtonGroup = () => {
    const [ledOn, setLedOn] = React.useState(true);
    const [buzzerOn, setBuzzerOn] = React.useState(false);
    const [ledLoading, setLedLoading] = React.useState(false);
    const [buzzerLoading, setBuzzerLoading] = React.useState(false);

    const ledClick = async () => {
        setLedLoading(true)
        const newLedState = !ledOn;
        setLedOn(newLedState);

        // Write the new state to Firebase
        const ledRef = ref(database, 'sensor/led');
        await set(ledRef, newLedState);

        setLedLoading(false)
    }

    const buzzerClick = async () => {
        setBuzzerLoading(true)
        const newBuzzerState = !buzzerOn;
        setBuzzerOn(newBuzzerState);

        // Write the new state to Firebase
        const buzzerRef = ref(database, 'sensor/buzzer');
        await set(buzzerRef, newBuzzerState);
        setBuzzerLoading(false)
    }

    async function getSensorData() {
        const sensorDataRef = ref(database, 'sensor')
        onValue(sensorDataRef, (snapshot) => {
            const data = snapshot.val()
            setBuzzerOn(data.buzzer)
            setLedOn(data.led)
        })
    }

    useEffect(() => {
        getSensorData()
    }, []);

    return (
        <Card>
            <Flex vertical={true}>
                <Flex style={{width: 200, height: 200}} justify='center' align='center' vertical={true}>
                    <Button shape='circle' icon={<PoweroffOutlined style={{fontSize: 50}} />} size='large' style={{transform: 'scale(1)', width: 90, height: 90}}
                            type='primary' danger={!ledOn} loading={ledLoading}
                            onClick={ledClick}
                    />
                    <Typography.Title>Led</Typography.Title>
                </Flex>
                <Flex style={{width: 200, height: 200}} justify='center' align='center' vertical={true}>
                    <Button shape='circle' icon={<PoweroffOutlined style={{fontSize: 50}} />} size='large' style={{transform: 'scale(1)', width: 90, height: 90}}
                            type='primary' danger={!buzzerOn} loading={buzzerLoading}
                            onClick={buzzerClick}
                    />
                    <Typography.Title>Buzzer</Typography.Title>
                </Flex>
            </Flex>
        </Card>
    );
};

export default ButtonGroup;
