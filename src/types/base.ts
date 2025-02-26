export type Task = {
    id: string;
    name: string;
    description: string | null;
    deadline: string | null;
    completed: boolean;
}