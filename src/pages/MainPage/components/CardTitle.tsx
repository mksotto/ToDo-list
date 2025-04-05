import {FC} from "react";
import {Button, Flex, Popover, Typography} from "antd";
import {LogoutOutlined, PlusOutlined, UserOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {authDelete} from "../../../api/auth/authDelete.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    tasksRefetch: () => void;
    setIsAddModalOpen: (isOpen: boolean) => void;
};

export const CardTitle: FC<Props> = ({tasksRefetch, setIsAddModalOpen}) => {
    const navigate = useNavigate();
    const onLogout = async () => {
        try {
            await authDelete();
            tasksRefetch();
        } catch (e) {
            console.error(e)
        }
    };
    const content = (
        <Flex vertical gap={8}>
            <Button type='dashed' onClick={() => navigate('/auth')}>
                <UserSwitchOutlined />
                Change user
            </Button>
            <Button
                danger
                type='primary'
                onClick={onLogout}
            >
                <LogoutOutlined />
                Log out
            </Button>
        </Flex>
    );
    const loggedIn = (
        <Popover placement='bottomRight' trigger='click' arrow={false} content={content}>
            <Button>
                <UserOutlined />
                Admin
            </Button>
        </Popover>
    )
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
                {loggedIn}
            </Flex>
        </Flex>
    )
};