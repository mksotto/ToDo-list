import {FC} from "react";
import {DatePicker, DatePickerProps, Form, Input, Modal} from "antd";
import {Task} from "../../types/base.ts";
import {uuidv7} from "uuidv7";

type Props = {
    tasks: Task[];
    setTasks: (callback: (value: Task[]) => Task[]) => void,
    isModalOpen: boolean,
    onClose: () => void,
}

type TaskFormType = {
    task: string,
    description: string,
    deadline: DatePickerProps['value'],
}

export const AddTaskModal: FC<Props> = ({tasks, setTasks, isModalOpen, onClose}) => {

    const [form] = Form.useForm();

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
            ]
            localStorage.setItem('tasks', JSON.stringify(editedTasks))
            return editedTasks
        });
        onClose();
    };

    return (
        <Modal
            title='Добавить задачу'
            open={isModalOpen}
            okText='Добавить'
            cancelText='Отмена'
            onOk={form.submit}
            onCancel={onClose}
            destroyOnClose
        >
            <Form
                form={form}
                onFinish={onSubmit}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                preserve={false}
                labelAlign='left'
            >
                <Form.Item
                    name='task'
                    label='Задача'
                    rules={[
                        {type: 'string', required: true, message: 'Введите название задачи'},
                    ]}
                >
                    <Input placeholder='Помыть машину' />
                </Form.Item>
                <Form.Item
                    name='description'
                    label='Описание'
                >
                    <Input.TextArea autoSize={{minRows: 4, maxRows: 6}} />
                </Form.Item>
                <Form.Item
                    name='deadline'
                    label='Выполнить до'
                >
                    <DatePicker
                        showTime
                        // locale={locale}
                        // onChange={onChange}
                        style={{width: '100%'}}
                        placeholder='Выберите дату и время'
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};