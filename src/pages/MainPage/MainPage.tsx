import {FC, useState} from "react";
import {Card, Flex, List,} from "antd";
import {CardTitle} from "./components/CardTitle.tsx";
import styles from "./MainPage.module.css";
import {AddEditTaskModal} from "./components/AddEditTaskModal.tsx";
import {Task} from "../../types/domain/todo-list.ts";
// import {LOCALSTORAGE_KEY} from "../../constants/constants.ts";
import {ListFooter} from "./components/ListFooter/ListFooter.tsx";
import {TaskItem} from "./components/TaskItem/TaskItem.tsx";
import {useTasks} from "../../queries/useTasks.ts";

export const MainPage: FC = () => {
    const {data: tasks, refetch: tasksRefetch} = useTasks();
    if (!tasks) return null

    // const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]'));
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [editableTask, setEditableTask] = useState<Task | null>(null);
    const [currentTab, setCurrentTab] = useState<string>('all');
    const filterByCurrentTab = (t: Task[]) => {
        if (currentTab === 'completed') {
            return t.filter((task) => task.completed)
        }
        if (currentTab === 'active') {
            return t.filter((task) => !task.completed)
        }
        return t
    };
    return (
        <Flex justify='center' align='center' className={styles.layout}>
            <Card
                title={<CardTitle setIsAddModalOpen={setIsAddModalOpen} />}
                className={styles.card}
            >
                <List
                    className={styles.list}
                    bordered
                    footer={
                        <ListFooter
                            tasks={tasks}
                            tasksRefetch={tasksRefetch}
                            currentTab={currentTab}
                            setCurrentTab={setCurrentTab}
                        />
                    }
                >
                    {Boolean(filterByCurrentTab(tasks).length)
                        && filterByCurrentTab(tasks).map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                tasksRefetch={tasksRefetch}
                                setEditableTask={setEditableTask}
                                setIsAddModalOpen={setIsAddModalOpen}
                            />
                        ))
                    }
                </List>
                <AddEditTaskModal
                    tasksRefetch={tasksRefetch}
                    editableTask={editableTask}
                    deleteEditableTask={() => setEditableTask(null)}
                    isAddModalOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                />
            </Card>
        </Flex>
    );
};