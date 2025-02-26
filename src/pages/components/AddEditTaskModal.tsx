import {FC} from "react";
import {DatePicker, DatePickerProps, Form, Input, Modal} from "antd";
import {Task} from "../../types/base.ts";
import dayjs from "dayjs";
import {useSetTasks} from "../utils/useSetTasks.ts";

type Props = {
    editableTask: Task | null;
    deleteEditableTask: () => void;
    tasks: Task[];
    setTasks: (callback: (value: Task[]) => Task[]) => void,
    isAddModalOpen: boolean,
    onClose: () => void,
}

type TaskFormType = {
    task: string,
    description?: string,
    deadline?: DatePickerProps['value'],
}

export const AddEditTaskModal: FC<Props> = () => {
    const [form] = Form.useForm();

    const {onSubmit, onEdit, onCancel, editableTask, isAddModalOpen} = useSetTasks()

    const initialValues: TaskFormType | undefined = editableTask ? {
        task: editableTask.name,
        description: editableTask.description || '',
        deadline: editableTask.deadline ? dayjs(editableTask.deadline) : null,
    } : undefined;

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
                    <Input.TextArea placeholder='ggg' autoSize={{minRows: 4, maxRows: 6}} />
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