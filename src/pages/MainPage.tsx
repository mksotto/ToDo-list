import {FC} from "react";
import {Card, List} from "antd";
import {CardTitle} from "./components/CardTitle.tsx";
import styles from "./MainPage.module.css";
import {AddEditTaskModal} from "./components/AddEditTaskModal.tsx";
import {useSetTasks} from "./utils/useSetTasks.ts";
import {TaskItem} from "./components/TaskItem/TaskItem.tsx";

export const MainPage: FC = () => {
     const {tasks, editableTask, setTasks, setEditableTask, isAddModalOpen, setIsAddModalOpen, } = useSetTasks();

    return (
        <Card
            variant='borderless'
            title={<CardTitle setIsAddModalOpen={setIsAddModalOpen} />}
            className={styles.card}
        >
            <List>
                {tasks.map((task) => (
                    <TaskItem task={task} />
                ))}
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