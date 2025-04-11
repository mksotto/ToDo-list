import {describe, expect, it} from 'vitest';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MainPage} from "../MainPage.tsx";
import {Task} from "../../../types/domain/todo-list.ts";
import {LOCALSTORAGE_KEY} from "../../../constants/constants.ts";

describe('MainPage', () => {
    it('Check how it should return true if there are no children', async () => {
        render(<MainPage />);
        await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: /ToDo list/i })).toBeInTheDocument());
    });

    it('Check how it should render a task that has been added to the localStorage', async () => {
        const tasks: Task[] = [
            {id: '1', name: 'Test task 1', description: null, deadline: null, completed: false},
        ];
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(tasks));
        render(<MainPage />);
        await waitFor(() => expect(screen.getByTestId(`${tasks[0].name}`)).toBeInTheDocument());
    });

    it('Should open modal on click add task button', async () => {
        render(<MainPage />);
        fireEvent.click(screen.getByTestId('add-task-button'));
        await waitFor(() => expect(screen.getByText(/Добавить задачу/i)).toBeInTheDocument());
    });

    it('Should close modal on add task button click and render a new task', async () => {
        render(<MainPage />);
        fireEvent.click(screen.getByTestId('add-task-button'));
        await waitFor(() => expect(screen.getByText(/Добавить задачу/i)).toBeInTheDocument());
        await waitFor(() => fireEvent.change(screen.getByTestId('set-task-name'), {target: {value: 'Test task 2'}}));
        await waitFor(() => fireEvent.click(screen.getByText('Добавить')));
        await waitFor(() => expect(screen.getByText('Test task 2')).toBeInTheDocument());
    });

    it('Should close modal on add task button click and render a new task with description', async () => {
        render(<MainPage />);
        fireEvent.click(screen.getByTestId('add-task-button'));
        await waitFor(() => expect(screen.getByText(/Добавить задачу/i)).toBeInTheDocument());
        await waitFor(() => fireEvent.change(screen.getByTestId('set-task-name'), {target: {value: 'Test task 3'}}));
        await waitFor(() => fireEvent.change(screen.getByTestId('set-task-description'), {target: {value: 'This is a test task 3'}}));
        await waitFor(() => fireEvent.click(screen.getByText('Добавить')));
        await waitFor(() => expect(screen.getByTestId('description')).toBeInTheDocument());
    });
});