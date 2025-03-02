import dayjs from "dayjs";

export type Task = {
    id: string;
    name: string;
    description: string | null;
    deadline: dayjs.Dayjs | null;
    completed: boolean;
}