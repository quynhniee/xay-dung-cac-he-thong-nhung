import React, {useEffect} from 'react';
import {Card, Flex, Image, Modal, Typography} from "antd";
import FireOff from "../assets/fire-off.gif"
import FireOn from "../assets/fire-on.gif"
import {onValue, ref, set} from "firebase/database";
import database from "../helpers/firebase-helper";

const FireDetectResult = () => {
    const [fireDetected, setFireDetected] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOk = async () => {
        // Write the new state to Firebase
        const buzzerRef = ref(database, 'sensor/buzzer');
        await set(buzzerRef, false);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (fireDetected) {
            setOpen(true);
        }
    }, [fireDetected]);

    async function getSensorData() {
        const sensorDataRef = ref(database, 'sensor')
        onValue(sensorDataRef, (snapshot) => {
            const data = snapshot.val()
            console.log(data.buzzer)
            setFireDetected(data.buzzer)
        })
    }

    useEffect(() => {
        getSensorData()
    }, []);

    return (
        <>
            <FireWarningModal open={open} handleOk={handleOk} handleCancel={handleCancel}/>
            <Card title="Trạng thái">
            <Flex vertical={true} gap={10}>
                <Typography.Text style={ !fireDetected ? {} : {fontSize: 30 }} strong={true} type={fireDetected ? 'danger' : 'secondary'}>
                    {fireDetected ? "Phát hiện lửa" : "Không phát hiện lửa"}
                </Typography.Text>
                <Image
                    width={500}
                    src={fireDetected ? FireOn : FireOff}/>
            </Flex>
        </Card>
        </>
    );
};

interface FireWarningModalProps {
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

const FireWarningModal: React.FC<FireWarningModalProps> = ({open, handleCancel, handleOk})  => {
    return (
        <>
            <Modal width={'300'} title="Cảnh báo: Phát hiện lửa" centered open={open} onOk={handleOk} onCancel={handleCancel} okText={"Tắt chuông báo"} cancelText={"Đóng"}>
                <Flex vertical={true}>
                    <Typography.Text>
                        Đèn và còi báo đang hoạt động.
                    </Typography.Text>
                    <Typography.Text>
                        Để tắt đèn và còi báo, vui lòng nhấn nút "Tắt chuông báo".
                    </Typography.Text>
                </Flex>
            </Modal>
        </>
    );
};



export default FireDetectResult;
