import {Tabs, TabsProps} from "antd";
import styles from './ListFooter.module.css';
import {FC} from "react";
import {tasksCompletedDelete} from "../../../../api/tasks/tasksCompletedDelete.ts";
import {useTasks} from "../../../../queries/useTasks.ts";

type Props = {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
};

export const ListFooter: FC<Props> = ({currentTab, setCurrentTab}) => {
    const {data: tasks, refetch} = useTasks();
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
                void refetch();
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