import {FC} from "react";
import {Button, Flex, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";

type Props = {
    setIsModalOpen: (isOpen: boolean) => void;
}

export const CardTitle: FC<Props> = ({setIsModalOpen}) => {

    return (
        <Flex align='center' justify='space-between' gap={24}>
            <Typography.Title>{'ToDo list'}</Typography.Title> {/* {''} чтобы не ругалась IDE */}
            <Button
                style={{marginTop: 8, width: 32}}
                onClick={() => setIsModalOpen(true)}
            >
                <PlusOutlined />
            </Button>
        </Flex>
    )
}