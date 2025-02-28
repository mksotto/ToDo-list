import {describe, expect, it} from 'vitest';
import {fireEvent, render, screen} from "@testing-library/react";
import {MainPage} from "../MainPage.tsx";
import {Task} from "../../../types/base.ts";
import {LOCALSTORAGE_KEY} from "../../../constants/constants.ts";

describe('MainPage', () => {
    it('Check how it should return true if there are no children', () => {
        render(<MainPage />);
        expect(screen.getByRole('heading', { level: 1, name: /ToDo list/i })).toBeInTheDocument();
    });

    it('Check how it should render a task that has been added to the localStorage', () => {
        const tasks: Task[] = [
            {id: '1', name: 'Test task 1', description: null, deadline: null, completed: false},
        ];
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(tasks));
        render(<MainPage />);
        expect(screen.getByTestId('task with id 1')).toBeInTheDocument()
    })

    it('Should open modal on click add task button', () => {
        render(<MainPage />);
        fireEvent.click(screen.getByTestId('add-task-button'));
        expect(screen.getByText(/Добавить задачу/i)).toBeInTheDocument();
    })
})