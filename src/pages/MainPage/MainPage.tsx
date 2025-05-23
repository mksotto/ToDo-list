import {useState} from "react";
import {Card, Flex, List,} from "antd";
import {CardTitle} from "./components/CardTitle.tsx";
import styles from "./MainPage.module.css";
import {AddEditTaskModal} from "./components/AddEditTaskModal.tsx";
import {Task} from "../../types/domain/todo-list.ts";
import {ListFooter} from "./components/ListFooter/ListFooter.tsx";
import {TaskItem} from "./components/TaskItem/TaskItem.tsx";
import {useTasks} from "../../queries/useTasks.ts";
import {PageType} from "../../types/PageType.ts";
import {checkAuth} from "../../modules/checkAuth.ts";
import {useProfile} from "../../stores/ProfileStore.ts";

export const MainPage: PageType = () => {
    const {profile} = useProfile();
    const {data: tasks, isFetched} = useTasks();
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [editableTask, setEditableTask] = useState<Task | null>(null);
    const [currentTab, setCurrentTab] = useState<string>('all');
    const filterByCurrentTab = (t: Task[]) => {
        if (currentTab === 'completed') {
            return t.filter((task) => task.completed);
        }
        if (currentTab === 'active') {
            return t.filter((task) => !task.completed);
        }
        return t;
    };
    return (
        <Flex justify='center' align='center' className={styles.layout}>
            <Card
                title={<CardTitle setIsAddModalOpen={setIsAddModalOpen} />}
                className={styles.card}
                loading={Boolean(profile) && !isFetched}
            >
                <List
                    className={styles.list}
                    bordered
                    footer={
                        <ListFooter
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
                                setEditableTask={setEditableTask}
                                setIsAddModalOpen={setIsAddModalOpen}
                            />
                        ))
                    }
                </List>
                <AddEditTaskModal
                    editableTask={editableTask}
                    deleteEditableTask={() => setEditableTask(null)}
                    isAddModalOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                />
            </Card>
        </Flex>
    );
};

MainPage.loader = checkAuth;