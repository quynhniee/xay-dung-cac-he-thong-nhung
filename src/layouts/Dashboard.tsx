import AreaChart from "../components/AreaChart";
import {Flex, Typography} from "antd";
import React, {useEffect} from "react";
import {limitToLast, onValue, orderByKey, query, ref} from "firebase/database";
import database from "../helpers/firebase-helper";

export const Dashboard = () => {

    const [temperatures, setTemperatures] = React.useState<any[]>([])
    const [humidities, setHumidities] = React.useState<any[]>([])
    const [data, setData] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(false);

    async function getAllFields() {
        setLoading(true);
        const demoRef = ref(database, 'demo');
        onValue(demoRef, (snapshot) => {

            const data = Object.values(snapshot.val());
            data.sort((a: any, b: any) => {
                const tempDiff = parseFloat(b.temperature) - parseFloat(a.temperature);
                if (tempDiff !== 0) {
                    return tempDiff;
                } else {
                    return parseFloat(a.humidity) - parseFloat(b.humidity);
                }
            });
            console.log(data);
            setLoading(false)
            setData(data ? data.map((d: any) => ({temperature: d.temperature, humidity: d.humidity,})) : [])
            setTemperatures(data ? data.map((d: any) => ({temperature: d.temperature, humidity: d.humidity,})) : [])
            setHumidities(data ? data.map((d: any) => ({humidity: d.humidity, temperature: d.temperature})) : [])
        });
    }

    useEffect(() => {
        getAllFields()
    }, []);
    return (
        <Flex vertical={true}>
            <Typography.Title>
                Dashboard
            </Typography.Title>
            <Flex gap={20}>
                <AreaChart loading={loading} title="Nhiệt độ" color='pink' data={data} type={'temperature'}/>
                <AreaChart loading={loading} title="Độ ẩm" color='#4287f5' data={data} type={'humidity'} />
            </Flex>
        </Flex>

    );
};
