import {FC} from "react";
import {Task} from "../../../types/base.ts";
import styles from "./TaskItem.module.css";
import {Button, Checkbox, Flex, List, Popover} from "antd";
import cx from "classnames";
import {CloseOutlined, EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {LOCALSTORAGE_KEY} from "../../../constants/constants.ts";

type Props = {
    task: Task;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    setIsAddModalOpen: (isOpen: boolean) => void;
    setEditableTask: (task: Task) => void;
}

export const TaskItem: FC<Props> = ({task, tasks, setTasks, setIsAddModalOpen, setEditableTask}) => {
    const handleChangeProperty = <T extends keyof Task>(
        id: Task['id'],
        property: T,
        value: Task[T],
    ) => {
        const modifiedTasks = tasks.map((task) => {
            if (task.id === id) {
                return ({
                    ...task,
                    [property]: value,
                })
            } else {
                return task
            }
        });
        setTasks(modifiedTasks);
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(modifiedTasks));
    };
    const handleDeleteTask = (task: Task) => {
        const modifiedTasks = tasks.filter((t) => {
            if (task.id !== t.id) {
                return t
            }
        });
        setTasks(modifiedTasks);
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(modifiedTasks));
    };
    const lessThanHourToGo = (task: Task) => {
        if (!task.completed) {
            const dateNowPlusHour = Date.now() + 60 * 60 * 1000;
            const deadline = Date.parse(dayjs(task.deadline).toISOString());
            return task.deadline ? deadline <= dateNowPlusHour : false;
        }
    };
    const lessThanFifteenToGo = (task: Task) => {
        if (!task.completed) {
            const dateNowPlusFifteenMinutes = Date.now() + 15 * 60 * 1000;
            const deadline = Date.parse(dayjs(task.deadline).toISOString());
            return task.deadline ? deadline <= dateNowPlusFifteenMinutes : false;
        }
    };
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
                    onChange={(e) => handleChangeProperty(task.id, 'completed', e.target.checked)}
                />
                <div className={styles.name}>{task.name}</div>
                {task.description && <Popover title='Описание' content={popoverContent}>
                    <InfoCircleOutlined className={styles.descriptionIcon} />
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