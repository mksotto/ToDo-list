import {FC, useState} from "react";
import {Card, Checkbox, List} from "antd";
import {CardTitle} from "./components/CardTitle.tsx";
import styles from "./MainPage.module.css";
import {AddTaskModal} from "./components/AddTaskModal.tsx";
import {Task} from "../types/base.ts";

export const MainPage: FC = () => {

    const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleChangeProperty = <T extends keyof Task>(
        id: Task['id'],
        property: T,
        value: Task[T],
    ) => {
        const modifiedTasks = tasks.map((t) => {
            if (t.id === id) {
                return ({
                    ...t,
                    [property]: value,
                })
            } else {
                return t
            }
        });
        setTasks(modifiedTasks);
        localStorage.setItem('tasks', JSON.stringify(modifiedTasks));
    };

    return (
        <Card
            variant='borderless'
            title={<CardTitle setIsModalOpen={setIsModalOpen} />}
            className={styles.card}
        >
            <List>
                {tasks.map((task) => (
                        <List.Item key={task.id}>
                            {task.name}
                            <Checkbox
                                checked={task.completed}
                                onChange={(e) => handleChangeProperty(task.id, 'completed', e.target.checked)}
                            />
                        </List.Item>
                    )
                )}
            </List>
            <AddTaskModal
                tasks={tasks}
                setTasks={setTasks}
                isModalOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </Card>
    )
}