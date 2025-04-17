import {FC} from "react";
import {Task} from "../../../../types/domain/todo-list.ts";
import styles from "./TaskItem.module.css";
import {Button, Checkbox, Flex, List, Popover} from "antd";
import cx from "classnames";
import {CloseOutlined, EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {tasksIdCompletedPut} from "../../../../api/tasks/tasksIdCompletedPut.ts";
import {tasksIdDelete} from "../../../../api/tasks/tasksIdDelete.ts";
import {useTasks} from "../../../../queries/useTasks.ts";

type Props = {
    task: Task;
    setIsAddModalOpen: (isOpen: boolean) => void;
    setEditableTask: (task: Task) => void;
}

export const TaskItem: FC<Props> = ({task, setIsAddModalOpen, setEditableTask}) => {
    const {refetch} = useTasks();
    const handleCompletion = (id: Task['id'], value: boolean) =>
        tasksIdCompletedPut(id, {completed: value})
            .then(() => refetch())
            .catch(e => console.error(e));
    const handleDeleteTask = (task: Task) =>
        tasksIdDelete(task.id)
            .then(() => refetch())
            .catch(e => console.error(e));
    const makeMinutesDebounce = (task: Task, minutes: number) => {
        if (task.deadline && !task.completed) {
            const dateNowPlusDebounce = Date.now() + minutes * 60 * 1000;
            const deadline = Date.parse(task.deadline);
            return task.deadline ? deadline <= dateNowPlusDebounce : false;
        }
        return false;
    };
    const lessThanHourToGo = (task: Task) => makeMinutesDebounce(task, 60);
    const lessThanFifteenToGo = (task: Task) => makeMinutesDebounce(task, 15);
    const deadlineColor = {
        [styles.attentive]: lessThanHourToGo(task),
        [styles.warned]: lessThanFifteenToGo(task),
        [styles.completed]: task.completed,
    };
    const popoverContent = <div className={styles.description}>{task.description}</div>;
    return (
        <List.Item
            key={task.id}
            className={cx(styles.listItem, deadlineColor)}
        >
            <Flex gap={8}>
                <Checkbox
                    className={styles.checkbox}
                    checked={task.completed}
                    onChange={(e) => handleCompletion(task.id, e.target.checked)}
                />
                <div data-testid={`${task.name}`} className={styles.name}>{task.name}</div>
                {task.description && <Popover title='Описание' content={popoverContent}>
                    <InfoCircleOutlined data-testid='description' className={styles.descriptionIcon} />
                </Popover>}
                {task.deadline && <div className={styles.deadline}>до {dayjs(task.deadline).format('DD.MM.YYYY HH:mm')}</div>}
            </Flex>
            <Flex gap={8}>
                <Button
                    onClick={() => {
                        setIsAddModalOpen(true);
                        setEditableTask(task);
                    }}
                    className={cx(styles.actionButton, deadlineColor)}
                >
                    <EditOutlined/>
                </Button>
                <Button
                    onClick={() => handleDeleteTask(task)}
                    className={cx(styles.actionButton, deadlineColor)}
                >
                    <CloseOutlined/>
                </Button>
            </Flex>
        </List.Item>
    );
};