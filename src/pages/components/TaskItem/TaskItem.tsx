import {FC} from "react";
import cx from "classnames";
import styles from "../../MainPage.module.css";
import {Button, Checkbox, Flex, List} from "antd";
import dayjs from "dayjs";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {Task} from "../../../types/base.ts";
import {useSetTasks} from "../../utils/useSetTasks.ts";

type Props = {
    task: Task
}

export const TaskItem: FC<Props> = ({task}) => {

    const {handleChangeProperty, setIsAddModalOpen, setEditableTask, handleDeleteTask} = useSetTasks()

    const lessThanHourToGo = () => {
        if (!task.completed) {
            const dateNowPlusHour = Date.now() + 60 * 60 * 1000
            const deadline = Date.parse(dayjs(task.deadline).format('YYYY-MM-DDTHH:mm:ss'))
            return task.deadline ? deadline <= dateNowPlusHour : false
        }
    };

    const lessThanFifeteenToGo = () => {
        if (!task.completed) {
            const dateNowPlusHour = Date.now() + 15 * 60 * 1000
            const deadline = Date.parse(dayjs(task.deadline).format('YYYY-MM-DDTHH:mm:ss'))
            return task.deadline ? deadline <= dateNowPlusHour : false
        }
    };

    return (
        <List.Item key={task.id} className={cx(styles.listItem, {
            [styles.attentive]: lessThanHourToGo(),
            [styles.warned]: lessThanFifeteenToGo(),
        })}>
            <Flex justify='space-between' align='center' style={{width: '100%'}}>
                <Flex gap={8}>
                    <Checkbox
                        checked={task.completed}
                        onChange={(e) => handleChangeProperty(task.id, 'completed', e.target.checked)}
                    />
                    <div>{task.name}</div>
                    {task.deadline && <div>до {dayjs(task.deadline).format('DD.MM.YYYY HH:mm')}</div>}
                </Flex>
                <Flex gap={8}>
                    <Button
                        onClick={() => {
                            setIsAddModalOpen(true);
                            setEditableTask(task);
                        }}
                        className={cx(styles.actionButton, {
                            [styles.attentive]: lessThanHourToGo(),
                            [styles.warned]: lessThanFifeteenToGo(),
                        })}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        onClick={() => handleDeleteTask(task)}
                        className={cx(styles.actionButton, {
                            [styles.attentive]: lessThanHourToGo(),
                            [styles.warned]: lessThanFifeteenToGo(),
                        })}
                    >
                        <CloseOutlined />
                    </Button>
                </Flex>
            </Flex>
        </List.Item>
    )
}