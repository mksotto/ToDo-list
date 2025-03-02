import {FC} from "react";
import {DatePicker, DatePickerProps, Form, Input, Modal} from "antd";
import {Task} from "../../../types/base.ts";
import {uuidv7} from "uuidv7";
import {LOCALSTORAGE_KEY} from "../../../constants/constants.ts";

type Props = {
    tasks: Task[];
    setTasks: (callback: (value: Task[]) => Task[]) => void,
    editableTask: Task | null;
    deleteEditableTask: () => void;
    isAddModalOpen: boolean,
    onClose: () => void,
};

type TaskFormType = {
    name: string,
    description?: string,
    deadline?: DatePickerProps['value'],
};

export const AddEditTaskModal: FC<Props> = ({editableTask, deleteEditableTask, tasks, setTasks, isAddModalOpen, onClose}) => {
    const [form] = Form.useForm();
    const initialValues: TaskFormType | undefined = editableTask ? {
        name: editableTask.name,
        description: editableTask.description || '',
        deadline: editableTask.deadline || null,
    } : undefined;
    const onSubmit = (values: TaskFormType) => {
        setTasks(() => {
            const editedTasks = [
                ...tasks,
                {
                    id: uuidv7(),
                    name: values.name,
                    description: values.description || null,
                    deadline: values.deadline || null,
                    completed: false,
                }
            ];
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(editedTasks));
            return editedTasks;
        });
        onClose();
    };
    const onCancel = () => {
        deleteEditableTask();
        onClose();
    };
    const onEdit = (values: TaskFormType) => {
        setTasks(() => {
            const editedTasks = tasks.map((t) => {
                if (t.id === editableTask!.id) {
                    return ({
                        ...t,
                        name: values.name,
                        description: values.description || null,
                        deadline: values.deadline || null,
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
    return (
        <Modal
            title={editableTask ? 'Редактирование' : 'Добавить задачу'}
            open={isAddModalOpen}
            okText={editableTask ? 'Изменить' : 'Добавить'}
            cancelText='Отмена'
            onOk={form.submit}
            onCancel={onCancel}
            destroyOnClose
        >
            <Form
                form={form}
                onFinish={editableTask ? onEdit : onSubmit}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                preserve={false}
                labelAlign='left'
                initialValues={initialValues}
            >
                <Form.Item
                    name='name'
                    label='Задача'
                    rules={[
                        {type: 'string', required: true, message: 'Введите название задачи'},
                    ]}
                >
                    <Input data-testid='set-task-name' placeholder='Помыть машину' />
                </Form.Item>
                <Form.Item
                    name='description'
                    label='Описание'
                >
                    <Input.TextArea data-testid='set-task-description' autoSize={{minRows: 4, maxRows: 16}} />
                </Form.Item>
                <Form.Item
                    name='deadline'
                    label='Выполнить до'
                >
                    <DatePicker
                        format="DD.MM.YYYY HH:mm"
                        showTime={{format: 'HH:mm'}}
                        style={{width: '100%'}}
                        placeholder='Выберите дату и время'
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};