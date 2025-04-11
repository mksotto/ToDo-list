import {FC} from "react";
import {Button, Flex, Popover, Typography} from "antd";
import {EditOutlined, LoginOutlined, PlusOutlined, UserOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useProfile} from "../../../stores/ProfileStore.ts";
import {AUTH_BASE_URL, PROFILE_BASE_URL} from "../../../constants/constants.ts";

type Props = {
    setIsAddModalOpen: (isOpen: boolean) => void;
};

export const CardTitle: FC<Props> = ({setIsAddModalOpen}) => {
    const navigate = useNavigate();
    const {profile: user} = useProfile();
    const onLogout = () => navigate(AUTH_BASE_URL, {state: {logout: true}});
    const content = (
        <Flex vertical gap={8}>
            <Button type='dashed' onClick={() => navigate(PROFILE_BASE_URL)}>
                <EditOutlined />
                Редактировать
            </Button>
            <Button type='dashed' danger onClick={onLogout}>
                <UserSwitchOutlined />
                Change user
            </Button>
        </Flex>
    );
    const loggedIn = (
        <Popover placement='bottomRight' trigger='click' arrow={false} content={content}>
            <Button>
                <UserOutlined />
                {user?.username}
            </Button>
        </Popover>
    );
    const unloggedIn = (
        <Button onClick={() => navigate(AUTH_BASE_URL)}>
            <LoginOutlined />
            Войти
        </Button>
    );
    return (
        <Flex align='center' justify='space-between' gap={24}>
            <Typography.Title
                style={{marginTop: '0.5em'}}>{'ToDo list'}</Typography.Title> {/* {''} чтобы не ругалась IDE */}
            <Flex style={{marginTop: 8}} gap={8}>
                <Button
                    data-testid='add-task-button'
                    style={{width: 32}}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <PlusOutlined/>
                </Button>
                {user ? loggedIn : unloggedIn}
            </Flex>
        </Flex>
    );
};