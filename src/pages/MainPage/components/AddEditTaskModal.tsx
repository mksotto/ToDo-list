import {FC} from "react";
import {DatePicker, DatePickerProps, Form, Input, Modal} from "antd";
import {Task} from "../../../types/domain/todo-list.ts";
import dayjs from "dayjs";
import {tasksPost} from "../../../api/tasks/tasksPost.ts";
import {tasksIdPatch} from "../../../api/tasks/tasksIdPatch.ts";
import {getNewOrNullOrUndefined, getNewOrUndefined} from "../../../utils/getNewOrUndefined.ts";
import {isApiError} from "../../../errors/ApiError.ts";
import {useNavigate} from "react-router-dom";
import {AUTH_BASE_URL} from "../../../constants/constants.ts";
import {useTasks} from "../../../queries/useTasks.ts";

type Props = {
    editableTask: Task;
    deleteEditableTask: () => void;
    isAddModalOpen: boolean,
    onClose: () => void,
};

type TaskFormType = {
    name: string,
    description: string,
    deadline: DatePickerProps['value'] | null,
};

export const AddEditTaskModal: FC<Props> = ({editableTask, deleteEditableTask, isAddModalOpen, onClose}) => {
    const [form] = Form.useForm();
    const {refetch} = useTasks();
    const navigate = useNavigate();
    const initialValues: TaskFormType = {
        name: editableTask.name,
        description: editableTask.description || '',
        deadline: editableTask.deadline ? dayjs(editableTask.deadline) : null,
    };
    const onCreate = async (values: TaskFormType) => {
        try {
            await tasksPost({
                name: values.name,
                description: values.description,
                deadline: values.deadline?.toISOString(),
            });
            void refetch();
        } catch (e) {
            if (isApiError(e) && e.code === 401) {
                navigate(AUTH_BASE_URL);
            }
        } finally {
            onClose();
        }
    };
    const onCancel = () => {
        deleteEditableTask();
        onClose();
    };
    const onEdit = (values: TaskFormType) =>
        tasksIdPatch(editableTask.id, {
            name: getNewOrUndefined(editableTask.name, values.name),
            description: getNewOrNullOrUndefined(editableTask.description, values.description),
            deadline: getNewOrNullOrUndefined(editableTask.deadline, values.deadline?.toISOString()),
        })
            .then(() => refetch())
            .catch(e => console.error(e))
            .finally(onCancel);
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
                onFinish={editableTask ? onEdit : onCreate}
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