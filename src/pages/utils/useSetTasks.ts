import {useState} from "react";
import {Task} from "../../types/base.ts";
import {LOCALSTORAGE_KEY} from "../../constants/constants.ts";
import {uuidv7} from "uuidv7";
import {DatePickerProps} from "antd";

type TaskFormType = {
    task: string,
    description?: string,
    deadline?: DatePickerProps['value'],
}

export const useSetTasks = () => {
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
    const onCancel = () => {
        setEditableTask(null);
        setIsAddModalOpen(false);
    }
    const onSubmit = (values: TaskFormType) => {
        setTasks(() => {
            const editedTasks = [
                ...tasks,
                {
                    id: uuidv7(),
                    name: values.task,
                    description: values.description || null,
                    deadline: values.deadline ? String(values.deadline) : null,
                    completed: false,
                }
            ];
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(editedTasks));
            return editedTasks;
        });
        setIsAddModalOpen(false);
    };
    const onEdit = (values: TaskFormType) => {
        setTasks(() => {
            const editedTasks = tasks.map((t) => {
                if (t.id === editableTask!.id) {
                    return ({
                        ...t,
                        name: values.task,
                        description: values.description || null,
                        deadline: values.deadline ? String(values.deadline) : null,
                    })
                } else {
                    return t
                }
            });
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(editedTasks));
            return editedTasks;
        });
        onCancel();
    };

    return {
        tasks,
        setTasks,
        isAddModalOpen,
        setIsAddModalOpen,
        editableTask,
        setEditableTask,
        handleChangeProperty,
        handleDeleteTask,
        onSubmit,
        onEdit,
        onCancel,
    }
};