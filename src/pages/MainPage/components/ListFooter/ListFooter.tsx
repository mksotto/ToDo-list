import {Tabs, TabsProps} from "antd";
import styles from './ListFooter.module.css';
import {FC} from "react";
import {Task} from "../../../../types/domain/todo-list.ts";
import {tasksCompletedDelete} from "../../../../api/tasks/tasksCompletedDelete.ts";

type Props = {
    tasks: Task[];
    tasksRefetch: () => void;
    currentTab: string;
    setCurrentTab: (tab: string) => void;
};

export const ListFooter: FC<Props> = ({tasks, tasksRefetch, currentTab, setCurrentTab}) => {
    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: 'All',
        },
        {
            key: 'active',
            label: 'Active',
        },
        {
            key: 'completed',
            label: 'Completed',
        }
    ];
    const ItemsLeft: FC = () => {
        const activeItems = tasks.filter((t) => !t.completed)
        return (
            <div className={styles.itemsLeft}>
                {activeItems.length} {activeItems.length <= 1 ? 'item' : 'items'} left
            </div>
        )
    };
    const ClearCompleted: FC = () => {
        const handleDelete = async () => {
            try {
                await tasksCompletedDelete();
                tasksRefetch();
            } catch (e) {
                console.error(e);
            }
        };
        return (
            <div
                className={styles.deleteCompleted}
                onClick={handleDelete}
            >
                Clear completed
            </div>
        );
    };
    return (
        <Tabs
            className={styles.tabs}
            tabPosition='bottom'
            items={items}
            activeKey={currentTab}
            onChange={setCurrentTab}
            centered
            tabBarExtraContent={{left: <ItemsLeft />, right: <ClearCompleted />}}
        />
    );
};