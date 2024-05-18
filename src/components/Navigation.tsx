import {Anchor} from "antd";
import {Header} from "antd/es/layout/layout";

export const Navigation = () => {
    return (
        <>
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                background: "#f5f5f5",
            }}>
            <Anchor
                style={{color: "#FFF"}}
                direction="horizontal"
                items={[
                    {
                        key: "dashboard",
                        href: "/dashboard",
                        title: "Dashboard",
                    },
                    {
                        key: "home",
                        href: "/home",
                        title: "Home",
                    },
                ]}
            >
            </Anchor>
            </Header>
        </>
    );
};
