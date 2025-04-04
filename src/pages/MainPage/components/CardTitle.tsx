import {FC} from "react";
import {Button, Flex, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";

type Props = {
    setIsAddModalOpen: (isOpen: boolean) => void;
};

export const CardTitle: FC<Props> = ({setIsAddModalOpen}) => (
    <Flex align='center' justify='space-between' gap={24}>
        <Typography.Title style={{marginTop: '0.5em'}}>{'ToDo list'}</Typography.Title> {/* {''} чтобы не ругалась IDE */}
        <Button
            data-testid='add-task-button'
            style={{marginTop: 8, width: 32}}
            onClick={() => setIsAddModalOpen(true)}
        >
            <PlusOutlined />
        </Button>
    </Flex>
);