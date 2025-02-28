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
            {id: '1', name: 'Test task', description: null, deadline: null, completed: false},
        ];
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(tasks));
        render(<MainPage />);
        expect(screen.getByRole('generic', {name: 'Test task'})).toBeInTheDocument()
    })

    it('Should open modal on click add task button', () => {
        const element = document.querySelector('[aria-label="plus"]');
        const addTaskButtonElement = element?.parentElement;
        render(<MainPage />);
        fireEvent.click(addTaskButtonElement!);
        expect(screen.getByText(/Добавить задачу/i)).toBeInTheDocument();
    })
})