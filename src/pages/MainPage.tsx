import {FC, useEffect, useState} from "react";
import {Card, List} from "antd";
import {CardTitle} from "./components/CardTitle.tsx";
import styles from "./MainPage.module.css";
import {AddTaskModal} from "./components/AddTaskModal.tsx";
import {Task} from "../types/base.ts";

export const MainPage: FC = () => {

    const tasks: Task[] = []

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <Card
            variant="borderless"
            title={<CardTitle setIsModalOpen={setIsModalOpen} />}
            className={styles.card}
        >
            <List>

            </List>
            <AddTaskModal tasks={tasks} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Card>
    )
}