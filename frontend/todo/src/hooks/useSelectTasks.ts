import { useCallback, useState } from 'react';
import { Task } from '../types/Task';

type Props = {
    id: number;
    taskCards: Task[];
    onOpen: () => void;
};

//選択したユーザー情報を特定しモーダルに反映する
export const useSelectTasks = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const onSelectedTask = useCallback((props: Props) => {
        const { id, taskCards, onOpen } = props;
        const targetTask = taskCards.find((taskCards) => taskCards.taskId === id);
        setSelectedTask(targetTask ?? null);
        onOpen();
    }, []);

    return { onSelectedTask, selectedTask };
};
