import {FC, useState} from "react";
import {Button, Card, Checkbox, Flex, List, Popover} from "antd";
import {CardTitle} from "./components/CardTitle.tsx";
import styles from "./MainPage.module.css";
import {AddEditTaskModal} from "./components/AddEditTaskModal.tsx";
import {Task} from "../types/base.ts";
import dayjs from "dayjs";
import {CloseOutlined, EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {LOCALSTORAGE_KEY} from "../constants/constants.ts";
import cx from 'classnames';
import {ListFooter} from "./components/ListFooter/ListFooter.tsx";

export const MainPage: FC = () => {
    const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]'));
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [editableTask, setEditableTask] = useState<Task | null>(null);

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
            const dateNowPlusHour = Date.now() + 60 * 60 * 1000
            const deadline = Date.parse(dayjs(task.deadline).format('YYYY-MM-DDTHH:mm:ss'))
            return task.deadline ? deadline <= dateNowPlusHour : false
        }
    };
    const lessThanFifeteenToGo = (task: Task) => {
        if (!task.completed) {
            const dateNowPlusFifeteenMinutes = Date.now() + 15 * 60 * 1000
            const deadline = Date.parse(dayjs(task.deadline).format('YYYY-MM-DDTHH:mm:ss'))
            return task.deadline ? deadline <= dateNowPlusFifeteenMinutes : false
        }
    };
    return (
        <Card
            variant='borderless'
            title={<CardTitle setIsAddModalOpen={setIsAddModalOpen} />}
            className={styles.card}
        >
            <List
                className={styles.list}
                bordered
                footer={<ListFooter tasks={tasks} setTasks={setTasks} />}
            >
                {tasks.map((task) => {
                    const deadlineColor = {
                        [styles.attentive]: lessThanHourToGo(task),
                        [styles.warned]: lessThanFifeteenToGo(task),
                        [styles.completed]: task.completed,
                    }
                    const popoverContent = <div className={styles.description}>{task.description}</div>
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
                    )
                })}
            </List>
            <AddEditTaskModal
                editableTask={editableTask}
                tasks={tasks}
                setTasks={setTasks}
                deleteEditableTask={() => setEditableTask(null)}
                isAddModalOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </Card>
    );
};