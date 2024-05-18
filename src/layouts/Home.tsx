import React, {useEffect} from 'react';
import FireDetectResult from "../components/FireDetectResult";
import ESP32Data from "../components/ESP32Data";
import {Flex, Typography} from "antd";
import ButtonGroup from "../components/ButtonGroup";

const Home = () => {


    useEffect(() => {

    }, []);
    return (
        <Flex vertical={true}>
            <Typography.Title>Home</Typography.Title>
            <Flex gap={10} vertical={true}>
                <Flex gap={20}>
                    <FireDetectResult/>
                    <ButtonGroup/>
                </Flex>
                <ESP32Data/>
            </Flex>
        </Flex>
    );
};

export default Home;
