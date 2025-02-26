import {Tabs, TabsProps} from "antd";
import styles from './ListFooter.module.css';
import {FC} from "react";
import {Task} from "../../../types/base.ts";
import {LOCALSTORAGE_KEY} from "../../../constants/constants.ts";

type Props = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
};

export const ListFooter: FC<Props> = ({tasks, setTasks}) => {
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
                {activeItems.length} items left
            </div>
        )
    };
    const ClearCompleted: FC = () => {
        const handleDelete = () => {
            const modifiedTasks = tasks.filter((t) => !t.completed);
            setTasks(modifiedTasks);
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(modifiedTasks));
        }
        return (
            <div
                className={styles.deleteCompleted}
                onClick={handleDelete}
            >
                Clear completed
            </div>
        )
    };
    return (
        <Tabs
            className={styles.tabs}
            tabPosition='bottom'
            items={items}
            centered
            tabBarExtraContent={{left: <ItemsLeft />, right: <ClearCompleted />}}
        />
    );
};